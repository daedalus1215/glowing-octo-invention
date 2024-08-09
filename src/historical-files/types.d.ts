
export type DriveKey = 'R' | 'V' | 'T';
export type RestoreStatus = {
    IsRestoreInProgress: boolean;
    IsRestored: AWS.S3.RestoreStatus;
}
export type File = {
    key: string;
    lastModified: Date;
    restoreStatus: {
        IsRestoreInProgress?: boolean,
        RestoreExpiryDate?: Date
    };
    owner: string;
    size: number;
};

export type BucketContent = {
    files: File[];
    folders: string[];
    path: string
};
