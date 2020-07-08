import {DefaultCrudRepository} from '@loopback/repository';
import {Photos, PhotosRelations} from '../models';
import {PlaceholderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PhotosRepository extends DefaultCrudRepository<
  Photos,
  typeof Photos.prototype.id,
  PhotosRelations
> {
  constructor(
    @inject('datasources.placeholder') dataSource: PlaceholderDataSource,
  ) {
    super(Photos, dataSource);
  }
}
