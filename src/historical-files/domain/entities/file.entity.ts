import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('files') // The table name in the database
export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, name: 'bucket_name' })
    bucketName: string;

    @Column({ type: 'text', name: 'file_path' })
    path: string;

    @Column({ type: 'varchar', length: 255, name: 'file_name' })
    name: string;

    @Column({ type: 'bigint', name: 'file_size' })
    fileSize: number;

    @Column({ type: 'timestamp', name: 'last_modified' })
    lastModified: Date;
}