/* eslint-disable prettier/prettier */
export interface Config {
  env: string;
  context: string;
  port: number;
  scheduler_admin_secret_key: string;
  databases: {
    postgres: Postgres;
  };
}

export interface Postgres {
  url: string;
}

export const Configs = (): Config => {
  return {
    env: process.env.APP_ENVIROMENT || 'dev',
    scheduler_admin_secret_key:
      process.env.SCHEDULER_ADMIN_SECRET_KEY ||
      'e3df6ced-8107-4b66-b2bb-98534099c3c9',
    context: process.env.CONTEXT || 'jobscheduler',
    port: parseInt(process.env.APP_PORT) || parseInt('3000'),
    databases: {
      postgres: {
        url: process.env.DATABASE_POSTGRES_URL || '',
      },
    },
  };
};
