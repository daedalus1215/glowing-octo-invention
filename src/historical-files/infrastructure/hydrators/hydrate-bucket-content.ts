import { Injectable } from "@nestjs/common";
import { AWSError } from "aws-sdk";
import { ListObjectsV2Output } from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";
import { BucketContent, File } from "src/historical-files/types";

@Injectable()
export class HydrateBucketContent {
    constructor() { }

    apply(response: PromiseResult<ListObjectsV2Output, AWSError>, path: string): BucketContent {
        return {
            files: this.extractOnlyFilesFromContents(response, path),
            folders: this.extractOnlySubFoldersFromCommonPrefixes(response),
            path: path
        };
    }

    extractOnlySubFoldersFromCommonPrefixes(response: PromiseResult<ListObjectsV2Output, AWSError>) {
        return response.CommonPrefixes
            ?.map(prefix => prefix.Prefix) || [];
    }

    extractOnlyFilesFromContents(response: PromiseResult<ListObjectsV2Output, AWSError>, path: string): File[] {
        return response.Contents
            .filter(file => file.Key !== path)
            .map(file  => ({
                key: file.Key,
                size: file.Size,
                restoreStatus: file.RestoreStatus,
                lastModified: file.LastModified,
                owner: file.Owner?.DisplayName || '', // Get the owner's display name if available
            })) || [];
    }
}