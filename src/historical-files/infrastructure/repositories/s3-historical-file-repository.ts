import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { BucketContent, DriveKey } from "../../types";
import { HistoricalFileRepository } from "../../domain/ports/historical-file-repository.port";
import { HydrateBucketContent } from "../hydrators/hydrate-bucket-content";


@Injectable()
export class S3HistoricalFileRepository implements HistoricalFileRepository {
    private s3: AWS.S3;
    private s3MappedDrives: {
        R: ''
        V: ''
        T: ''
    };

    constructor(private configService: ConfigService, private readonly hydrateBucketContent: HydrateBucketContent) {
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

    async findAll(rootBucket: DriveKey, path: string = ''): Promise<BucketContent> {
        try {
            const params = this.createParams(rootBucket, path)

            return this.hydrateBucketContent.apply(await this.s3.listObjectsV2(params).promise(), path)
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

}