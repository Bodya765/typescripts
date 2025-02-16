import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('role') role: string
  ): Promise<UserService> {
    return this.userService.createUser(username, password, email, role);
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<UserService | null> {
    return this.userService.findUserByUsername(username);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserService | null> {
    return this.userService.findUserByEmail(email);
  }
}
