import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'username123' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
