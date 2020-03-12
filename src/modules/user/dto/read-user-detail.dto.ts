import { Exclude, Expose } from 'class-transformer';
import { IsString, IsDateString } from 'class-validator';

@Exclude()
export class ReadUserDetailDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly lastname: string;

  @IsDateString()
  @Expose()
  readonly fechaNac: Date;
}
