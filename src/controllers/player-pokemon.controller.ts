import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Player,
  Pokemon,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerPokemonController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/pokemon', {
    responses: {
      '200': {
        description: 'Array of Player has many Pokemon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pokemon)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pokemon>,
  ): Promise<Pokemon[]> {
    return this.playerRepository.pokemon(id).find(filter);
  }

  @post('/players/{id}/pokemon', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pokemon)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Player.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {
            title: 'NewPokemonInPlayer',
            exclude: ['id'],
            optional: ['playerId']
          }),
        },
      },
    }) pokemon: Omit<Pokemon, 'id'>,
  ): Promise<Pokemon> {
    return this.playerRepository.pokemon(id).create(pokemon);
  }

  @patch('/players/{id}/pokemon', {
    responses: {
      '200': {
        description: 'Player.Pokemon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Partial<Pokemon>,
    @param.query.object('where', getWhereSchemaFor(Pokemon)) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.playerRepository.pokemon(id).patch(pokemon, where);
  }

  @del('/players/{id}/pokemon', {
    responses: {
      '200': {
        description: 'Player.Pokemon DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pokemon)) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.playerRepository.pokemon(id).delete(where);
  }
}
