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
import {Photos} from '../models';
import {PhotosRepository} from '../repositories';

export class PhotosController {
  constructor(
    @repository(PhotosRepository)
    public photosRepository : PhotosRepository,
  ) {}

  @post('/photos', {
    responses: {
      '200': {
        description: 'Photos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Photos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Photos, {
            title: 'NewPhotos',
            exclude: ['id'],
          }),
        },
      },
    })
    photos: Omit<Photos, 'id'>,
  ): Promise<Photos> {
    return this.photosRepository.create(photos);
  }

  @get('/photos/count', {
    responses: {
      '200': {
        description: 'Photos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Photos)) where?: Where<Photos>,
  ): Promise<Count> {
    return this.photosRepository.count(where);
  }

  @get('/photos', {
    responses: {
      '200': {
        description: 'Array of Photos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Photos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Photos)) filter?: Filter<Photos>,
  ): Promise<Photos[]> {
    return this.photosRepository.find(filter);
  }

  @patch('/photos', {
    responses: {
      '200': {
        description: 'Photos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Photos, {partial: true}),
        },
      },
    })
    photos: Photos,
    @param.query.object('where', getWhereSchemaFor(Photos)) where?: Where<Photos>,
  ): Promise<Count> {
    return this.photosRepository.updateAll(photos, where);
  }

  @get('/photos/{id}', {
    responses: {
      '200': {
        description: 'Photos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Photos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Photos)) filter?: Filter<Photos>
  ): Promise<Photos> {
    return this.photosRepository.findById(id, filter);
  }

  @patch('/photos/{id}', {
    responses: {
      '204': {
        description: 'Photos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Photos, {partial: true}),
        },
      },
    })
    photos: Photos,
  ): Promise<void> {
    await this.photosRepository.updateById(id, photos);
  }

  @put('/photos/{id}', {
    responses: {
      '204': {
        description: 'Photos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() photos: Photos,
  ): Promise<void> {
    await this.photosRepository.replaceById(id, photos);
  }

  @del('/photos/{id}', {
    responses: {
      '204': {
        description: 'Photos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.photosRepository.deleteById(id);
  }
}
