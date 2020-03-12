import { IsString, ValidateNested, IsBoolean } from 'class-validator';
import { UpdateUserDetailDto } from './update-user-detail.dto';

export class UpdateUserDto {
  @IsString()
  nDocument: string;

  @IsBoolean()
  chofer: boolean;

  @ValidateNested()
  details: UpdateUserDetailDto;
}
