import { User } from 'src/users/entity/user.entity';
import { Admin } from 'src/admin/entity/admin.entity';
export declare const CurrentUser: (...dataOrPipes: (keyof User | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
export declare const CurrentAdmin: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof Admin | undefined)[]) => ParameterDecorator;
