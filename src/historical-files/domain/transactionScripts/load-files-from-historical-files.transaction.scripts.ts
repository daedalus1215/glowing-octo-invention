import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class LoadFilesFromHistoricalFiles {
    private s3 = new S3();

    constructor(
        @InjectRepository(File)
        private FileRepository: Repository<File>,
    ) { }

    async apply() {
        const buckets = await this.s3.listBuckets().promise();

        for (const bucket of buckets.Buckets) {
            let continuationToken: string | undefined = undefined;

            do {
                const response = await this.s3.listObjectsV2({
                    Bucket: bucket.Name,
                    ContinuationToken: continuationToken,
                }).promise();

                const files = response.Contents.map(item => {
                    const file = new File();
                    file.bucketName = bucket.Name,
                        file.path = item.Key,
                        file.name = item.Key.split('/').pop(),
                        file.fileSize = item.Size,
                        file.lastModified = new Date(item.LastModified)
                    return file;
                });

                await this.FileRepository.save(files);

                continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
            } while (continuationToken);
        }
    }
}
