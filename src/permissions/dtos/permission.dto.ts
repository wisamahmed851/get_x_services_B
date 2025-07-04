import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  guard: string; // 'user' or 'admin'
}
export class UpdatePermissionDto {
  @IsOptional()
  name: string;

  @IsOptional()
  guard: string; // 'user' or 'admin'
}
