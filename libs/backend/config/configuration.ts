// libs/config/configuration.ts

export default () => ({
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
    // Add other configuration properties here
  });
  