import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Users } from './users.model';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'todos'
    }
  }
})
export class Todos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  // @property({
  //   type: 'number',
  // })
  @belongsTo(() => Users )
  userId?: number;

  @property({
    type: 'boolean',
  })
  completed?: boolean;

  @property({
    type: 'string',
  })
  title?: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Todos>) {
    super(data);
  }
}

export interface TodosRelations {
  // describe navigational properties here
}

export type TodosWithRelations = Todos & TodosRelations;
