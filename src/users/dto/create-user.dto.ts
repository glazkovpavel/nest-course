import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'E-mail',
  })
  @IsString({ message: 'Должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный Email' })
  readonly email: string;

  @ApiProperty({
    example: 'qwerty1234+_',
    description: 'Password',
  })
  @Length(4, 16, { message: 'Не  меньше 4 и не больше 16' })
  readonly password: string;
}
