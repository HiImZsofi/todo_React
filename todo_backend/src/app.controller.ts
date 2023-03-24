import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {Todo} from "./todo/todo.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todos/get')
  getAll(): Promise<Todo[]> {
    return this.appService.findAll();
  }
  @Get('/todos/get/:id')
  getOne(@Param('id') id:string): Promise<Todo> {
    return this.appService.findOne(Number(id));
  }

  @Post('/todos/create')
  async createOne(@Body() todo: Todo): Promise<void> {
    await this.appService.create(todo);
  }

  @Post('/todos/delete/:id')
  deleteOne(@Param('id') id: string): Promise<void>{
    return this.appService.remove(Number(id));
  }

  @Put('/todos/modify/:id')
  modifyOne(@Param('id') id: string, @Body() todo: Todo){
    return this.appService.modify(Number(id), todo)
  }
}

