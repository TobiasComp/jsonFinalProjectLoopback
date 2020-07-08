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
import {Albums} from '../models';
import {AlbumsRepository} from '../repositories';

export class AlbumsController {
  constructor(
    @repository(AlbumsRepository)
    public albumsRepository : AlbumsRepository,
  ) {}

  @post('/albums', {
    responses: {
      '200': {
        description: 'Albums model instance',
        content: {'application/json': {schema: getModelSchemaRef(Albums)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Albums, {
            title: 'NewAlbums',
            exclude: ['id'],
          }),
        },
      },
    })
    albums: Omit<Albums, 'id'>,
  ): Promise<Albums> {
    return this.albumsRepository.create(albums);
  }

  @get('/albums/count', {
    responses: {
      '200': {
        description: 'Albums model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Albums)) where?: Where<Albums>,
  ): Promise<Count> {
    return this.albumsRepository.count(where);
  }

  @get('/albums', {
    responses: {
      '200': {
        description: 'Array of Albums model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Albums, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Albums)) filter?: Filter<Albums>,
  ): Promise<Albums[]> {
    return this.albumsRepository.find(filter);
  }

  @patch('/albums', {
    responses: {
      '200': {
        description: 'Albums PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Albums, {partial: true}),
        },
      },
    })
    albums: Albums,
    @param.query.object('where', getWhereSchemaFor(Albums)) where?: Where<Albums>,
  ): Promise<Count> {
    return this.albumsRepository.updateAll(albums, where);
  }

  @get('/albums/{id}', {
    responses: {
      '200': {
        description: 'Albums model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Albums, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Albums)) filter?: Filter<Albums>
  ): Promise<Albums> {
    return this.albumsRepository.findById(id, filter);
  }

  @patch('/albums/{id}', {
    responses: {
      '204': {
        description: 'Albums PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Albums, {partial: true}),
        },
      },
    })
    albums: Albums,
  ): Promise<void> {
    await this.albumsRepository.updateById(id, albums);
  }

  @put('/albums/{id}', {
    responses: {
      '204': {
        description: 'Albums PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() albums: Albums,
  ): Promise<void> {
    await this.albumsRepository.replaceById(id, albums);
  }

  @del('/albums/{id}', {
    responses: {
      '204': {
        description: 'Albums DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.albumsRepository.deleteById(id);
  }
}
