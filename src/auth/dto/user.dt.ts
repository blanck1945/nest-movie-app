import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'johndoe' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
