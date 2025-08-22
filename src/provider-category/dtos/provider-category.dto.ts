import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AssignCategoriesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categories: number[]; // Array of category IDs
}
