import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { AWSError } from "aws-sdk";
import { ObjectList } from "aws-sdk/clients/s3";

@Injectable()
export class S3FileRepository {
    private s3: AWS.S3;
    private bucketName: string;

    constructor(private configService: ConfigService) {
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
            sessionToken: this.configService.get('AWS_SESSION_TOKEN'),  // Include session token
        });

        this.bucketName = this.configService.get('S3_BUCKET_NAME')
    }

    async find(key: string): Promise<string> {
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Expires: 60, // URL expiry time in seconds
        };

        return this.s3.getSignedUrlPromise('getObject', params);
    }

    async findAll(path: string = ''): Promise<{ files: string[]; folders: string[]; path: string }> {
        console.log('path2', path)
        if (path && !path.endsWith('/')) {
            path += '/';
        }
        console.log('path3', path)

        try {
            const params = {
                Bucket: this.bucketName,
                Prefix: path, // Use the path provided as a prefix
                Delimiter: '/', // This allows you to get common prefixes (folders)
            };

            const response = await this.s3.listObjectsV2(params).promise();
            console.log('response', response)
            // Extracting only subfolders from CommonPrefixes
            const folders = response.CommonPrefixes
                // ?.filter(prefix => prefix.Prefix !== path)
                ?.map(prefix => prefix.Prefix) || [];

            // Optionally, you can also list files under the specified path
            const files = response.Contents
                .filter(file => file.Key !== path)
                .map(file => file.Key) || [];

            return { files, folders, path };
        } catch (error) {
            console.error('Error fetching S3 objects:', error);
            throw new Error(`Access Denied: ${error.message}`);
        }
    }
}