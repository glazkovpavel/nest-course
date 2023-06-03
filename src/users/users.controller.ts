import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Users } from './users.models';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Пользователи') // @ApiTags Декоратор для эндпойнта в документации swagger
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' }) // Декораторы для документации в Swagger
  @ApiResponse({ status: 200, type: Users })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' }) // Декораторы для документации в Swagger
  @ApiResponse({ status: 200, type: [Users] })
  @UseGuards(JwtAuthGuard) // Использование гуарда
  @Get()
  getAll(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }
}
