import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  WhereBuilder,
  FilterBuilder,
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
import { Todos } from '../models';
import { TodosRepository } from '../repositories';

export class TodosController {
  constructor(
    @repository(TodosRepository)
    public todosRepository: TodosRepository,
  ) { }

  @post('/todos', {
    responses: {
      '200': {
        description: 'Todos model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Todos) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, {
            title: 'NewTodos',
            exclude: ['id'],
          }),
        },
      },
    })
    todos: Omit<Todos, 'id'>,
  ): Promise<Todos> {
    return this.todosRepository.create(todos);
  }

  @get('/todos/count', {
    responses: {
      '200': {
        description: 'Todos model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where<Todos>,
  ): Promise<Count> {
    return this.todosRepository.count(where);
  }

  @get('/todos/uncompleted', {
    responses: {
      '200': {
        description: 'Todos model get only uncompleted',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async getUncompleted(
  ): Promise<Todos[]> {
    let where = new WhereBuilder<Todos>();
    let filter = new FilterBuilder<Todos>();

    return this.todosRepository.find({ where: { completed: false } });
  }

  @get('/todos', {
    responses: {
      '200': {
        description: 'Array of Todos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Todos, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Todos)) filter?: Filter<Todos>,
  ): Promise<Todos[]> {
    return this.todosRepository.find(filter);
  }

  @patch('/todos', {
    responses: {
      '200': {
        description: 'Todos PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, { partial: true }),
        },
      },
    })
    todos: Todos,
    @param.query.object('where', getWhereSchemaFor(Todos)) where?: Where<Todos>,
  ): Promise<Count> {
    return this.todosRepository.updateAll(todos, where);
  }

  @get('/todos/{id}', {
    responses: {
      '200': {
        description: 'Todos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Todos, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Todos)) filter?: Filter<Todos>
  ): Promise<Todos> {
    return this.todosRepository.findById(id, filter);
  }

  @patch('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todos, { partial: true }),
        },
      },
    })
    todos: Todos,
  ): Promise<void> {
    await this.todosRepository.updateById(id, todos);
  }

  @put('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todos: Todos,
  ): Promise<void> {
    await this.todosRepository.replaceById(id, todos);
  }

  @del('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todosRepository.deleteById(id);
  }
}
