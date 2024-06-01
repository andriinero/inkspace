const env = import.meta.env;

export default {
  RESTAPI_SERVER_URL: env.VITE_RESTAPI_SERVER_URL,
} as const;
