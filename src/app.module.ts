import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VehicleRegistrationModule } from './vehicle-registration/vehicle-registration.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { RolesSeederModule } from './roles/seeder/roles-seeder.module';
import { RolesSeederService } from './roles/seeder/roles-seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    VehicleRegistrationModule,
    AuthModule,
    RolesModule,
    RolesSeederModule,
  ],
  controllers: [AppController, RolesController],
  providers: [AppService, RolesService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly rolesSeederService: RolesSeederService) {}

  async onApplicationBootstrap() {
    await this.rolesSeederService.seed();
  }
}
