import { IsString, IsDate } from 'class-validator';

export class UpdateUserDetailDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsDate()
  fechaNac?: Date;
}
