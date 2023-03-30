import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TodosController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/todos/get', () => {
    it('should return an array of todos', async () => {
      const response = await request(app.getHttpServer()).get('/todos/get');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/todos/get/:id', () => {
    it('should return a single todo', async () => {
      const response = await request(app.getHttpServer()).get('/todos/get/1');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });
  });

  describe('/todos/create', () => {
    it('should create a new todo', async () => {
      const todo = { title: 'Test Todo', completed: false };
      const response = await request(app.getHttpServer())
          .post('/todos/create')
          .send(todo);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(todo.title);
      expect(response.body.completed).toBe(todo.completed);
    });
  });

  describe('/todos/delete/:id', () => {
    it('should delete a todo', async () => {
      const response = await request(app.getHttpServer()).delete('/todos/delete/1');
      expect(response.status).toBe(200);
    });
  });

  describe('/todos/modify', () => {
    it('should modify a todo', async () => {
      const todo = { id: 1, title: 'Modified Todo', completed: true };
      const response = await request(app.getHttpServer())
          .put('/todos/modify')
          .send(todo);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(todo.title);
      expect(response.body.completed).toBe(todo.completed);
    });
  });
});
