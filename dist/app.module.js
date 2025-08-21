"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_auth_module_1 = require("./auth/user/user-auth.module");
const roles_module_1 = require("./roles/roles.module");
const roles_seeder_module_1 = require("./roles/seeder/roles-seeder.module");
const admin_module_1 = require("./admin/admin.module");
const admin_auth_module_1 = require("./auth/admin/admin-auth.module");
const permissions_module_1 = require("./permissions/permissions.module");
const role_permissions_module_1 = require("./role-permissions/role-permissions.module");
const admin_roles_module_1 = require("./assig-roles-admin/admin-roles.module");
const user_roles_module_1 = require("./assig-roles-user/user-roles.module");
const user_permission_module_1 = require("./assign-permission-user/user-permission.module");
const admin_permission_module_1 = require("./assign-permission-admin/admin-permission.module");
const saved_places_module_1 = require("./saved-places/saved-places.module");
const payment_methods_module_1 = require("./payment-methods/payment-methods.module");
const complaints_category_module_1 = require("./complaints-category/complaints-category.module");
const user_auth_seeder_module_1 = require("./auth/user/seeder/user-auth-seeder.module");
const admin_auth_seeder_module_1 = require("./admin/seeder/admin-auth-seeder.module");
const schedule_1 = require("@nestjs/schedule");
const city_module_1 = require("./city/city.module");
const zone_module_1 = require("./zone/zone.module");
const services_category_module_1 = require("./services-category/services-category.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            users_module_1.UsersModule,
            user_auth_module_1.UserAuthModule,
            roles_module_1.RolesModule,
            roles_seeder_module_1.RolesSeederModule,
            admin_module_1.AdminsModule,
            admin_auth_module_1.AdminAuthModule,
            permissions_module_1.PermissionsModule,
            role_permissions_module_1.RolePermissionModule,
            admin_roles_module_1.AdminRoleModule,
            user_roles_module_1.UserRoleModule,
            user_permission_module_1.UserPermissionModule,
            admin_permission_module_1.AdminPermissionModule,
            saved_places_module_1.SavedPlacesModule,
            payment_methods_module_1.PaymentMethodsModule,
            complaints_category_module_1.ComplaintsCategoryModule,
            user_auth_seeder_module_1.UserAuthSeederModule,
            admin_auth_seeder_module_1.AdminAuthSeederModule,
            city_module_1.CityModule,
            zone_module_1.ZoneModule,
            services_category_module_1.ServicesCategoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map