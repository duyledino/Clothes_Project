declare namespace Express {
  namespace Multer {
    interface File {
      /** Name of the form field */
      fieldname: string;
      /** Name of the file on the uploader's computer */
      originalname: string;
      /** Value of the `Content-Type` header for this file */
      mimetype: string;
      /** Size of the file in bytes */
      size: number;
      /** Location of the file on disk (if using diskStorage) */
      path: string;
      /** Filename in destination folder */
      filename: string;
    }
  }
}
