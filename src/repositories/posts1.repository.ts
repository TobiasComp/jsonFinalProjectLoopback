import {DefaultCrudRepository} from '@loopback/repository';
import {Posts1, Posts1Relations} from '../models';
import {PlaceholderDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Posts1Repository extends DefaultCrudRepository<
  Posts1,
  typeof Posts1.prototype.id,
  Posts1Relations
> {
  constructor(
    @inject('datasources.placeholder') dataSource: PlaceholderDataSource,
  ) {
    super(Posts1, dataSource);
  }
}
