import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Users, UsersRelations, Todos, Albums, Posts1 } from '../models';
import { PlaceholderDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TodosRepository } from './todos.repository';
import { AlbumsRepository } from './albums.repository';
import { Posts1Repository } from './posts1.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
  > {
  public readonly todos: HasManyRepositoryFactory<
    Todos,
    typeof Users.prototype.id
  >;
  public readonly albums: HasManyRepositoryFactory<
    Albums,
    typeof Users.prototype.id
  >;
  public readonly posts1: HasManyRepositoryFactory<
    Posts1,
    typeof Users.prototype.id
  >;
  constructor(
    @inject('datasources.placeholder') dataSource: PlaceholderDataSource,
    @repository.getter('TodosRepository')
    getTodosRepository: Getter<TodosRepository>,
    @repository.getter('AlbumsRepository')
    getAlbumsRepository: Getter<AlbumsRepository>,
    @repository.getter('Posts1Repository')
    getPosts1Repository: Getter<Posts1Repository>
  ) {
    super(Users, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor(
      'todos',
      getTodosRepository,
    );
    this.albums = this.createHasManyRepositoryFactoryFor(
      'albums',
      getAlbumsRepository
    )
    this.posts1 = this.createHasManyRepositoryFactoryFor(
      'posts1',
      getPosts1Repository
    )
  }
}
