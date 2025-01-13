export interface EnvironmentVariables {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export const validate = (config: Record<string, unknown>) => {
  const requiredEnvVars = ['MONGO_URL', 'JWT_SECRET'];
  for (const envVar of requiredEnvVars) {
    if (!config[envVar]) {
      throw new Error(`Environment variable ${envVar} is required`);
    }
  }
  return config;
};
