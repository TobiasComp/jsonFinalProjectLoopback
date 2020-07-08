import {DefaultCrudRepository} from '@loopback/repository';
import {Albums, AlbumsRelations} from '../models';
import {PlaceholderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AlbumsRepository extends DefaultCrudRepository<
  Albums,
  typeof Albums.prototype.id,
  AlbumsRelations
> {
  constructor(
    @inject('datasources.placeholder') dataSource: PlaceholderDataSource,
  ) {
    super(Albums, dataSource);
  }
}
