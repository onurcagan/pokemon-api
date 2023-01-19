import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Player} from './player.model';

@model()
export class Pokemon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  Type1: string;

  @property({
    type: 'string',
  })
  Type2?: string;

  @property({
    type: 'number',
    required: true,
  })
  Total: number;

  @property({
    type: 'number',
    required: true,
  })
  HP: number;

  @property({
    type: 'number',
    required: true,
  })
  Attack: number;

  @property({
    type: 'number',
    required: true,
  })
  Defense: number;

  @property({
    type: 'object',
    required: true,
  })
  Sp: object;

  @property({
    type: 'number',
    required: true,
  })
  Speed: number;

  @property({
    type: 'number',
    required: true,
  })
  Generation: number;

  @property({
    type: 'string',
    required: true,
  })
  Legendary: string;

  @belongsTo(() => Player)
  playerId: string;

  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;
