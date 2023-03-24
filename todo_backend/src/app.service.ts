import {Body, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Todo} from "./todo/todo.entity";
@Injectable()
export class AppService {
  constructor(
      @InjectRepository(Todo)
      private readonly todoRepository: Repository<Todo>
  ) {
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create (todo: Todo): Promise<void> {
    await this.todoRepository.save(todo);
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async modify(id: number, item: Partial<Todo>){
    await this.todoRepository.update(id, item)
  }
}
