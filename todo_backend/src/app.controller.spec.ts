import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Repository} from "typeorm";
import {Todo} from "./todo/todo.entity";

describe('TodoController', () => {
  let todoController: AppController;
  let appService: AppService;
  let repo: Repository<Todo>

  beforeEach(async () => {
    repo = {
      async findAll(): Promise<Todo[]> {
        return [{id: 1, title: "asd", completed: false}];
      }
    } as unknown as Repository<Todo>;

    appService = new AppService(repo);
    todoController = new AppController(appService);
  });

  describe('getAll', () => {
    it('should return an array of todos', async () => {
      // Arrange
      jest.spyOn(appService, 'findAll').mockResolvedValue(appService);

      // Act
      const result = await todoController.getAll();

      // Assert
      expect(result).toEqual(repo);
    });
  });
});




