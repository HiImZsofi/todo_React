import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Repository} from "typeorm";
import {Todo} from "./todo/todo.entity";
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodoService', () => {
  let service: AppService;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Todo),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todo1 = { id: 1, title: 'Todo 1', completed: false };
      const todo2 = { id: 2, title: 'Todo 2', completed: true };
      const todos = [todo1, todo2];
      repositoryMock.find.mockReturnValue(todos);

      const result = await service.findAll();

      expect(repositoryMock.find).toHaveBeenCalled();
      expect(result).toEqual(todos);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const todo = { title: 'New Todo', completed: false };

      await service.create(todo);

      expect(repositoryMock.save).toHaveBeenCalledWith(todo);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const todo = { id: 1, title: 'Todo 1', completed: false };
      repositoryMock.findOneBy.mockReturnValue(todo);

      const result = await service.findOne(1);

      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(todo);
    });
  });

  describe('remove', () => {
    it('should delete a todo', async () => {
      await service.remove(1);

      expect(repositoryMock.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('modify', () => {
    it('should update a todo', async () => {
      const update = { title: 'Updated Todo', completed: true };

      await service.modify(1, update);

      expect(repositoryMock.update).toHaveBeenCalledWith(1, update);
    });
  });
});




