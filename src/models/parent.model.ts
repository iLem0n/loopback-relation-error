import {Entity, model, property, hasMany} from '@loopback/repository';
import {Child} from './child.model';

@model()
export class Parent extends Entity {
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
  name: string;

  @hasMany(() => Child)
  children: Child[];

  constructor(data?: Partial<Parent>) {
    super(data);
  }
}

export interface ParentRelations {
  // describe navigational properties here
}

export type ParentWithRelations = Parent & ParentRelations;
