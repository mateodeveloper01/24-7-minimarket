import { z, ZodType } from "zod";

export const fileSchema: ZodType<File> = z.custom<File>((file) => {
    if (!(file instanceof File)) {
      return false;
    }
    // Example of additional validations
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 5 MB
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    // if (file.size > maxSize) {
    //   return false;
    // }
    // return true;
  }
  // , 
  // {
  //   message: 'Must be a valid file with allowed type and size',
  // }
);
  
