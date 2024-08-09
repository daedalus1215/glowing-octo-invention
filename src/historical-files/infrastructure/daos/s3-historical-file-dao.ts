import { Inject, Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { BucketContent, DriveKey } from "../../types";
import { HistoricalFileRepository } from "../../domain/ports/historical-file-repository.port";
import { HydrateBucketContent } from "../hydrators/hydrate-bucket-content";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { File } from "src/historical-files/domain/entities/file.entity";


@Injectable()
export class S3HistoricalFileDAO implements HistoricalFileRepository {
    private s3: AWS.S3;
    private s3MappedDrives: {
        R: ''
        V: ''
        T: ''
    };

    constructor(private configService: ConfigService, private readonly hydrateBucketContent: HydrateBucketContent,
        @InjectRepository(File) private readonly fileRepository: Repository<File>) {
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
            sessionToken: this.configService.get('AWS_SESSION_TOKEN'),  // Include session token
        });

        this.s3MappedDrives = {
            R: this.configService.get('S3_HISTORICAL_FILES_R'),
            V: this.configService.get('S3_HISTORICAL_FILES_V'),
            T: this.configService.get('S3_HISTORICAL_FILES_T'),
        }
    }

    async findAll(rootBucket: DriveKey, path: string): Promise<BucketContent> {
        try {
            return this.hydrateBucketContent.apply(
                await this.s3.listObjectsV2(this.createParams(rootBucket, path))
                    .promise(),
                path)
        } catch (error) {
            console.error('Error fetching S3 objects:', error);
            throw new Error(`Access Denied: ${error.message}`);
        }
    }

    createParams(rootBucket: DriveKey, path: string) {
        return {
            Bucket: this.s3MappedDrives[rootBucket],
            Prefix: path,
            Delimiter: '/',
        };
    }

    async load(rootBucket: DriveKey, prefix: string = '') {
        const bucketName = this.s3MappedDrives[rootBucket];
        this.recursivelyCheckBuckets(bucketName, prefix);
    }

    async recursivelyCheckBuckets(bucketName: string, prefix: string = '') {
        let continuationToken: string | undefined = undefined;
        do {
            const response = await this.s3.listObjectsV2({
                Bucket: bucketName,
                Prefix: prefix,
                Delimiter: '/',  
                ContinuationToken: continuationToken,
            }).promise();

            const s3Files = response.Contents.map(item => {
                const file = new File();
                
                file.bucketName = bucketName;
                file.path = item.Key;
                file.name = item.Key.split('/').pop();
                file.fileSize = item.Size;
                file.lastModified = item.LastModified;

                return file;
            });

            await this.fileRepository.save(s3Files);

            for (const commonPrefix of response.CommonPrefixes || []) {
                await this.recursivelyCheckBuckets(bucketName, commonPrefix.Prefix);
            }

            continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
        } while (continuationToken);
    }
}