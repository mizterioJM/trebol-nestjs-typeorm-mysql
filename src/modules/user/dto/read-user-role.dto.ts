import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ReadUserRoleDto {
  @Expose()
  @IsString()
  name: string;
}
