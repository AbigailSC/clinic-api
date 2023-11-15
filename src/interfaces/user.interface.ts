export interface UserType {
    email: string;
    password: string;
    image?: string;
    rol: string;
    verified: boolean;
    isActive: boolean;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    encryptPassword: (password: string) => Promise<string>;
  }