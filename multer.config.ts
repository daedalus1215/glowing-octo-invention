import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export const multerOptions = (configService: ConfigService) => ({
  storage: multerS3({
    s3: new AWS.S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    }),
    bucket: configService.get('S3_BUCKET_NAME'),
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
