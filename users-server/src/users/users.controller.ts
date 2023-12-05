import {
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.usersService.create(body);
    } catch (error) {
      if (error.response.status === 490) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const user = await this.usersService.delete(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    if (!user) throw new NotFoundException('User does not exist!');
    return user;
  }
}
