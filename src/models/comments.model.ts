import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'comments'
    }
  }
})
export class Comments extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  postId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Comments>) {
    super(data);
  }
}

export interface CommentsRelations {
  // describe navigational properties here
}

export type CommentsWithRelations = Comments & CommentsRelations;
