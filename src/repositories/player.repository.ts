import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Player, PlayerRelations, Pokemon} from '../models';
import {PokemonRepository} from './pokemon.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {

  public readonly pokemon: HasManyRepositoryFactory<Pokemon, typeof Player.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PokemonRepository') protected pokemonRepositoryGetter: Getter<PokemonRepository>,
  ) {
    super(Player, dataSource);
    this.pokemon = this.createHasManyRepositoryFactoryFor('pokemon', pokemonRepositoryGetter,);
    this.registerInclusionResolver('pokemon', this.pokemon.inclusionResolver);
  }
}
