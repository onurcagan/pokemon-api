import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pokemon,
  Player,
} from '../models';
import {PokemonRepository} from '../repositories';

export class PokemonPlayerController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) { }

  @get('/pokemon/{id}/player', {
    responses: {
      '200': {
        description: 'Player belonging to Pokemon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Player)},
          },
        },
      },
    },
  })
  async getPlayer(
    @param.path.string('id') id: typeof Pokemon.prototype.id,
  ): Promise<Player> {
    return this.pokemonRepository.player(id);
  }
}
