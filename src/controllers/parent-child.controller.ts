import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Parent,
  Child,
} from '../models';
import {ParentRepository} from '../repositories';

export class ParentChildController {
  constructor(
    @repository(ParentRepository) protected parentRepository: ParentRepository,
  ) { }

  @get('/parents', {
    responses: {
      '200': {
        description: 'Array of Parent has many Child',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parent, {
              title: 'ParentWithChildren',
                includeRelations: true
              })},
          },
        },
      },
    },
  })
  async parentsIncludingChildren(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Child>,
  ): Promise<Child[]> {
    return this.parentRepository.children(id).find(filter);
  }
}
