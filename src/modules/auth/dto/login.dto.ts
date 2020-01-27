import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  nDocument: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
