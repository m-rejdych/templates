declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      HOST?: string;
      PORT?: string;
    }
  }
}
