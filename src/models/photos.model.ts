import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'photos'
    }
  }
})
export class Photos extends Entity {
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
  albumId: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'string',
    required: true,
  })
  thumbnailUrl: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Photos>) {
    super(data);
  }
}

export interface PhotosRelations {
  // describe navigational properties here
}

export type PhotosWithRelations = Photos & PhotosRelations;
