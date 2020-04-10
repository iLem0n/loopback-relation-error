import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Parent, ParentRelations, Child} from '../models';
import {TestDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ChildRepository} from './child.repository';

export class ParentRepository extends DefaultCrudRepository<
  Parent,
  typeof Parent.prototype.id,
  ParentRelations
> {

  public readonly children: HasManyRepositoryFactory<Child, typeof Parent.prototype.id>;

  constructor(
    @inject('datasources.test') dataSource: TestDataSource, @repository.getter('ChildRepository') protected childRepositoryGetter: Getter<ChildRepository>,
  ) {
    super(Parent, dataSource);
    this.children = this.createHasManyRepositoryFactoryFor('children', childRepositoryGetter,);
    this.registerInclusionResolver('children', this.children.inclusionResolver);
  }
}
