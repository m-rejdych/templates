declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      HOST?: string;
      PORT?: string;
    }
  }
}
