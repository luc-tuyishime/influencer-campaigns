import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['INFLUENCER', 'BRAND'])
  role: 'INFLUENCER' | 'BRAND';
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
