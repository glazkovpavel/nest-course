import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'E-mail',
  })
  readonly email: string;
  @ApiProperty({
    example: 'qwerty1234+_',
    description: 'Password',
  })
  readonly password: string;
}
