import { IsNumber, IsString, IsBoolean } from 'class-validator';
import { ReadUserDetailDto } from './read-user-detail.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { ReadUserRoleDto } from './read-user-role.dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly nDocument: string;

  @Expose()
  @IsBoolean()
  readonly chofer: boolean;

  @Expose()
  @Type((type) => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type((type) => ReadUserRoleDto)
  readonly roles: ReadUserRoleDto[];
}
