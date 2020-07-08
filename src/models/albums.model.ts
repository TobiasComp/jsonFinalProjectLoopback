import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Users } from '.';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'albums'
    }
  }
})
export class Albums extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  // @property({
  //   type: 'number',
  //   required: true,
  // })
  @belongsTo(() => Users )
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Albums>) {
    super(data);
  }
}

export interface AlbumsRelations {
  // describe navigational properties here
}

export type AlbumsWithRelations = Albums & AlbumsRelations;
