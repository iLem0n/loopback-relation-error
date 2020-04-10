import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parent} from './parent.model';

@model()
export class Child extends Entity {
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
  nameChild: string;

  @belongsTo(() => Parent)
  parentId: string;

  constructor(data?: Partial<Child>) {
    super(data);
  }
}

export interface ChildRelations {
  // describe navigational properties here
}

export type ChildWithRelations = Child & ChildRelations;
