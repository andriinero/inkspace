const env = import.meta.env;

export default {
  RESTAPI_SERVER_URL: env.VITE_RESTAPI_SERVER_URL ?? "http://localhost:3000",
} as const;
