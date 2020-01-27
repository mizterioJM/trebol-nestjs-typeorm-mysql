import { IsString, ValidateNested } from 'class-validator';
import { UpdateUserDetailDto } from './update-user-detail.dto';

export class UpdateUserDto {
  @IsString()
  nDocument: string;

  @ValidateNested()
  details: UpdateUserDetailDto;
}
