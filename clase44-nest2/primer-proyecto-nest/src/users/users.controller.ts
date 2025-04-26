import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
// http://localhost:8080/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private config: ConfigService) {}

  @Post('prueba/:parametro')  /// (req,res) => {}
  probarResquest(@Request() req){
    console.log(req.query)
    console.log(req.body)
    console.log(req.params)
    return 'todo en el objeto request'
  }

  @Post()/// somo como herencias de clases pero para funciones
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.email) {
      throw new HttpException('Datos incompletos', HttpStatus.BAD_REQUEST)
      
    }
    return await this.usersService.create(createUserDto);
  }

  // @Get() // http://localhost:8080/users?limit=20
  // findAll(@Query() query) { 
  //   const { limit } = query
  //   console.log(limit)
  //   const users = this.usersService.findAll() 
  //   return {status: 'success', users}
  // }
  @Get() // http://localhost:8080/users?limit=20
  async findAll(@Query('limit') limit ) { 
    console.log(this.config.get<string>('NOMBRE'))
    console.log(limit)
    const users = await this.usersService.findAll() 
    return {status: 'success', users}
  }

  @Get(':id') // http://localhost:8080/users/:id
  findOne(@Param('id') id: string) {
    if(isNaN(+id)) throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST)
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
