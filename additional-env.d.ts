declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_CLOUDINARY_NAME: string;
      NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
      NEXT_PUBLIC_CLOUDINARY_API_SECRET: string;
      NEXT_PUBLIC_BACKEND_URL: string;
      NEXT_PUBLIC_WPP_NUMBER: number;
      DATABASE_URL: string;

      // NEXTAUTH_SECRET: string; //Session Secret
      // APP_JWT_SECRET: string; //Authorization Token secret
      // NEXTAUTH_URL: string;

      // GOOGLE_CLIENT_ID: string;
      // GOOGLE_CLIENT_SECRET: string;

      // NEXT_PUBLIC_SUPABASE_URL: string;
      // SUPABASE_SERVICE_ROLE_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
