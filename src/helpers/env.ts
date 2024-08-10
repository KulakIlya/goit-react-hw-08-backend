import { config } from 'dotenv';

config();

const env = <T>(name: string, defaultValue?: T) => {
  // await ConfigModule.envVariablesLoaded;

  const value = process.env[name];

  if (value) return value;

  if (!defaultValue) throw new Error(`${name} is not defined`);

  return defaultValue;
};

export default env;
