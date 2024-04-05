import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users') // router
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto.first_name)
    if (!createUserDto.first_name || !createUserDto.last_name || !createUserDto.email || !createUserDto.password) {
      throw new HttpException('Datos incompletos', HttpStatus.BAD_REQUEST)
    }
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // limitabamos los usuarios -> query limit
  // api/users  -> const {limit} = req.query
  // @Get()

  // findAll(@Query('limit') limit) {
  //   console.log(limit)
  //   const users = this.usersService.findAll();
  //   return {status: 'success', payload: users}
  // }
  
  @Get()
  findAll(@Query() query) {
    const { limit } = query
    console.log('limite de query: ', limit)
    const users = this.usersService.findAll();
    return {status: 'success', payload: users}
  }

  // api/users/:id
  // const {id} = req.params

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    if (isNaN(+uid)) throw new HttpException('invalid params', HttpStatus.BAD_REQUEST)

    return this.usersService.findOne(+uid);
  }

  @Patch(':id') // put -> actualiza todo y si no existe lo crea - patch actualiza parcialmente
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/:b')
  probarRequest(@Request() req){
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    return 'todo en eun objeto'
  }

}
