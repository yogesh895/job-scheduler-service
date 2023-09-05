import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from './role/role-guard';
import { HealthModule } from './health/health.module';
import { Configs } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [],
      type: 'postgres',
      host: Configs().databases.postgres.postgres_host,
      port: Configs().databases.postgres.postgres_port,
      password: Configs().databases.postgres.postgres_password,
      username: Configs().databases.postgres.postgres_username,
      database: Configs().databases.postgres.postgres_database,
      synchronize: true,
      logging: true,
      ssl: true,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
