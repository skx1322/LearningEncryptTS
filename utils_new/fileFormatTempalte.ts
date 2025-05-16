export type FileFormat =
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'text/plain'
  | 'application/zip'
  | 'application/x-7z-compressed'
  | 'application/octet-stream'
  | 'application/gz';

export type UUIDFormat =
  | "hex"
  | "base64"
  | "base64url";

export type SegmentLimit = 0 | 1 | 2 | 3 | 4;

export interface StandardFSObject {
  error: boolean,
  success: boolean,
  message: string,
  output: any,
}

export interface FileUploadSchema {
  fileName: string,
  uploadedFile: File
  fileFormat: FileFormat,
  fileMainDirectory: string,
  fileDirectory: string,
}

export interface StandardFileSchema {
  fileName: string,
  fileID: string,
  fileFormat: FileFormat,
  fileMainDirectory: string,
  fileDirectory: string,
  compressed: boolean,
}

export enum FileFormatEnum {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  GIF = 'image/gif',
  TXT = 'text/plain',
  ZIP = 'application/zip',
  SEVEN_Z = 'application/x-7z-compressed',
  AES = 'application/octet-stream',
  GZ = 'application/gz'
}

export const FileExtension = (format: FileFormat): string => {
  return format.split(`/`)[1]
}

export const reverseExtension = (extension: string): FileFormatEnum => {
    const formatMap: Record<string, FileFormatEnum> = {
        png: FileFormatEnum.PNG,
        jpeg: FileFormatEnum.JPEG,
        jpg: FileFormatEnum.JPEG, 
        gif: FileFormatEnum.GIF,
        txt: FileFormatEnum.TXT,
        zip: FileFormatEnum.ZIP,
        "7z": FileFormatEnum.SEVEN_Z,
        aes: FileFormatEnum.AES,
        gz: FileFormatEnum.GZ,
    };
    return formatMap[extension.toLowerCase()] || FileFormatEnum.AES; 
};

export const getExtension = (format: FileFormatEnum): string => {
    const mapping: Record<FileFormatEnum, string> = {
        [FileFormatEnum.PNG]: "png",
        [FileFormatEnum.JPEG]: "jpg",
        [FileFormatEnum.GIF]: "gif",
        [FileFormatEnum.TXT]: "txt",
        [FileFormatEnum.ZIP]: "zip",
        [FileFormatEnum.SEVEN_Z]: "7z",
        [FileFormatEnum.AES]: "aes",
        [FileFormatEnum.GZ]: "gz",
    };
    return mapping[format] || "dat"; 
};


export interface CryptoGenSchema {
  FileBuffer: string,
  KeyString: Buffer,
  IV: Buffer,
}

export interface EncryptFileSchema {
  EncryptedString: string,
  IV: Buffer,
  Tag: Buffer,
}

export interface DecryptFileSchema {
  EncryptedString: string,
  Key: Buffer,
  IV: Buffer,
  Tag: Buffer,
}

export interface FileCryptoSchema {
  fileName: string,
  fileID: string,
  fileFormat: FileFormat,
  fileMainDirectory: string,
  fileParentDirectory: string,
  secretKey?: string,
  fileFullDirectory?: string,
}
