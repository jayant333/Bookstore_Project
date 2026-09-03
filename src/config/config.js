const requireEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }

  return value;
};

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: requireEnv("JWT_SECRET"),

  jwtExpiresIn: process.env.JWT_EXPIRE_IN || "1d",
  corsOrigin: process.env.CORS_ORIGIN || "*",
};
