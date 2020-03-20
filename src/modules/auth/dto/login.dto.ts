import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  nDocument: string;

  @IsString()
  password: string;
}
