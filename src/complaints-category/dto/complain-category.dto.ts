export class CreateComplainCategoryDto{
    name: number;
    icon: number;
}

import { IsOptional, IsString } from 'class-validator';

export class UpdateComplainCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
