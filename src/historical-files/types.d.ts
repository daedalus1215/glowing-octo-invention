export type DriveKey = 'R' | 'V' | 'T';

export type File = {
    key: string,
    lastModified: Date,
    owner: string
}

export type BucketContent = {
    files: File[];
    folders: string[];
    path: string
};
