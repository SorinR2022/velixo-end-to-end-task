import * as dotenv from 'dotenv';
dotenv.config();

interface Credentials {
  url: string;
  username: string;
  password: string;
}

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const credentials: Credentials = {
  url: getEnvVar('EXCEL_URL'),
  username: getEnvVar('EXCEL_USERNAME'),
  password: getEnvVar('EXCEL_PASSWORD'),
};
