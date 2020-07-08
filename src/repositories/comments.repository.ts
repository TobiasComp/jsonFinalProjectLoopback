import {DefaultCrudRepository} from '@loopback/repository';
import {Comments, CommentsRelations} from '../models';
import {PlaceholderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CommentsRepository extends DefaultCrudRepository<
  Comments,
  typeof Comments.prototype.id,
  CommentsRelations
> {
  constructor(
    @inject('datasources.placeholder') dataSource: PlaceholderDataSource,
  ) {
    super(Comments, dataSource);
  }
}
