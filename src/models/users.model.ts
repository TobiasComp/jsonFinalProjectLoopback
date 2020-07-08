import { Entity, model, property, hasMany } from '@loopback/repository';
import { Todos } from './todos.model';
import { Albums } from './albums.model';
import { Posts1 } from './posts1.model';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'users'
    }
  }
})

export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  username?: string;

  @hasMany(() => Todos, { keyTo: 'userId' })
  todos?: Todos[];

  @hasMany(() => Albums, { keyTo: 'userId' })
  albums?: Albums[];

  @hasMany(() => Posts1, {keyTo: 'userId'})
  posts1?: Posts1[]
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
