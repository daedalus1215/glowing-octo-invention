import { BucketContent, DriveKey } from "src/historical-files/types"

export type HistoricalFileRepository = {
    findAll: (rootBucket: DriveKey, path?: string) => Promise<BucketContent> 
}