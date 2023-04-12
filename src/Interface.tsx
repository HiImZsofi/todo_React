import {ValidatorOptions} from "class-validator";

export interface Todos extends ValidatorOptions {
  id: number;
  title: string;
  completed: boolean;
}
