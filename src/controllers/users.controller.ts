import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Users, Todos, Albums, Posts1 } from '../models';
import { UsersRepository } from '../repositories';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    return this.usersRepository.create(users);
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    users: Users,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, { partial: true }),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }

  // Try out the users hasMany todo relationship
  @get('/users/{id}/todos', {
    responses: {
      '200': {
        description: 'Get todos of a user',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findTodosById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>
  ): Promise<Users> {
    let todos: Todos[]
    todos = await this.usersRepository.todos(id).find();
    console.log(todos);

    return this.usersRepository.findById(id, filter);
  }

  @get('/users/{id}/albums', {
    responses: {
      '200': {
        description: 'Get albums of a user',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findAlbumsById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>
  ): Promise<Users> {
    let albums: Albums[]
    albums = await this.usersRepository.albums(id).find();
    console.log(albums);

    return this.usersRepository.findById(id, filter);
  }

  @get('/users/{id}/posts', {
    responses: {
      '200': {
        description: 'Get posts of a user',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findPostsById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>
  ): Promise<Users> {
    let posts1: Posts1[]
    posts1 = await this.usersRepository.posts1(id).find();
    console.log(posts1);

    return this.usersRepository.findById(id, filter);
  }
}
