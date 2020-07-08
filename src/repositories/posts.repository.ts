import {DefaultCrudRepository} from '@loopback/repository';
import {Posts, PostsRelations} from '../models';
import {PlaceholderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostsRepository extends DefaultCrudRepository<
  Posts,
  typeof Posts.prototype.id,
  PostsRelations
> {
  constructor(
    @inject('datasources.placeholder') dataSource: PlaceholderDataSource,
  ) {
    super(Posts, dataSource);
  }
}
