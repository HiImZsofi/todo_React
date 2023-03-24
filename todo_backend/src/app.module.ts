import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Todo} from "./todo/todo.entity";

@Module({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  imports: [
      TypeOrmModule.forRoot(require('./typeorm.config')),
      TypeOrmModule.forFeature([Todo])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
