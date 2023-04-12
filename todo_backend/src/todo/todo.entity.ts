import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IsNotEmpty} from "class-validator";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  completed: boolean;
}
