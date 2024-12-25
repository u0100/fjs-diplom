import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserService, SearchUserParams } from './users.service';
import { ObjectId } from 'mongodb';
import { User } from './schema/users.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: Partial<User>): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findById(new ObjectId(id));
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Error finding user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Error finding user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Query() query: Partial<SearchUserParams>): Promise<User[]> {
    try {
      const params: SearchUserParams = {
        limit: query.limit ? parseInt(query.limit as unknown as string) : 10,
        offset: query.offset ? parseInt(query.offset as unknown as string) : 0,
        email: query.email || '',
        name: query.name || '',
        contactPhone: query.contactPhone || '',
      };
      return await this.userService.findAll(params);
    } catch (error) {
      throw new HttpException('Error finding users', HttpStatus.BAD_REQUEST);
    }
  }
}
