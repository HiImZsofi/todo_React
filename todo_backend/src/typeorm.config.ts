import {Todo} from "./todo/todo.entity";

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'backendtest',
  entities: [Todo],
  synchronize: true,
};
