export type EnvConfig = {
  apiUrl: string;
};

const envConfig: EnvConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
};

export default envConfig;
