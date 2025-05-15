export type FileFormat =
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'text/plain'
  | 'application/zip'
  | 'application/x-7z-compressed'
  | 'application/octet-stream'
  | 'application/gz';

export type UUIDFormat = | "hex" | "base64" | "base64url";

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
  ENC = 'application/octet-stream',
  AES = 'application/octet-stream',
  BIN = 'application/octet-stream',
  GZ = 'application/gz'
}