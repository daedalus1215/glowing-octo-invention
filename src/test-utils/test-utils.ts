import { DriveKey } from "src/historical-files/types";

export function getRandomDriveKey(): DriveKey {
    const driveKeys: DriveKey[] = ['R', 'V', 'T'];
    const randomIndex = Math.floor(Math.random() * driveKeys.length);
    return driveKeys[randomIndex];
  }