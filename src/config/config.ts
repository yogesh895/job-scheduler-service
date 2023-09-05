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
  typeorm_type: string;
  postgres_host: string;
  postgres_port: number;
  postgres_password: string;
  postgres_username: string;
  postgres_database: string;
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
        typeorm_type: process.env.DATABASE_TYPEORM_TYPE || 'postgres',
        postgres_host:
          process.env.DATABASE_POSTGRES_HOST ||
          'ep-purple-snowflake-59883390.ap-southeast-1.aws.neon.tech',
        postgres_port:
          parseInt(process.env.DATABASE_POSTGRES_PORT) || parseInt('5432'),
        postgres_password:
          process.env.DATABASE_POSTGRES_PASSWORD || 'NcfHe6XZtLl0',
        postgres_username: process.env.DATABASE_POSTGRES_USERNAME || 'yogesh',
        postgres_database:
          process.env.DATABASE_POSTGRES_DATABASE || 'jobscheduler',
      },
    },
  };
};
