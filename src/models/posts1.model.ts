import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Users } from './users.model';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'posts1'
    }
  }
})
export class Posts1 extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  //  @property({
  //    type: 'number',
  //    required: true,
  //  })
  @belongsTo(() => Users)
  userId?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Posts1>) {
    super(data);
  }
}

export interface Posts1Relations {
  // describe navigational properties here
}

export type Posts1WithRelations = Posts1 & Posts1Relations;
