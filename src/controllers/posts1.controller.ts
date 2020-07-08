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
import {Posts1} from '../models';
import {Posts1Repository} from '../repositories';

export class Posts1Controller {
  constructor(
    @repository(Posts1Repository)
    public posts1Repository : Posts1Repository,
  ) {}

  @post('/posts1s', {
    responses: {
      '200': {
        description: 'Posts1 model instance',
        content: {'application/json': {schema: getModelSchemaRef(Posts1)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posts1, {
            title: 'NewPosts1',
            exclude: ['id'],
          }),
        },
      },
    })
    posts1: Omit<Posts1, 'id'>,
  ): Promise<Posts1> {
    return this.posts1Repository.create(posts1);
  }

  @get('/posts1s/count', {
    responses: {
      '200': {
        description: 'Posts1 model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Posts1)) where?: Where<Posts1>,
  ): Promise<Count> {
    return this.posts1Repository.count(where);
  }

  @get('/posts1s', {
    responses: {
      '200': {
        description: 'Array of Posts1 model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Posts1, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Posts1)) filter?: Filter<Posts1>,
  ): Promise<Posts1[]> {
    return this.posts1Repository.find(filter);
  }

  @patch('/posts1s', {
    responses: {
      '200': {
        description: 'Posts1 PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posts1, {partial: true}),
        },
      },
    })
    posts1: Posts1,
    @param.query.object('where', getWhereSchemaFor(Posts1)) where?: Where<Posts1>,
  ): Promise<Count> {
    return this.posts1Repository.updateAll(posts1, where);
  }

  @get('/posts1s/{id}', {
    responses: {
      '200': {
        description: 'Posts1 model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Posts1, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Posts1)) filter?: Filter<Posts1>
  ): Promise<Posts1> {
    return this.posts1Repository.findById(id, filter);
  }

  @patch('/posts1s/{id}', {
    responses: {
      '204': {
        description: 'Posts1 PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posts1, {partial: true}),
        },
      },
    })
    posts1: Posts1,
  ): Promise<void> {
    await this.posts1Repository.updateById(id, posts1);
  }

  @put('/posts1s/{id}', {
    responses: {
      '204': {
        description: 'Posts1 PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() posts1: Posts1,
  ): Promise<void> {
    await this.posts1Repository.replaceById(id, posts1);
  }

  @del('/posts1s/{id}', {
    responses: {
      '204': {
        description: 'Posts1 DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.posts1Repository.deleteById(id);
  }
}
