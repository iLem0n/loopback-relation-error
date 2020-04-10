import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Child, ChildRelations, Parent} from '../models';
import {TestDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ParentRepository} from './parent.repository';

export class ChildRepository extends DefaultCrudRepository<
  Child,
  typeof Child.prototype.id,
  ChildRelations
> {

  public readonly parent: BelongsToAccessor<Parent, typeof Child.prototype.id>;

  constructor(
    @inject('datasources.test') dataSource: TestDataSource, @repository.getter('ParentRepository') protected parentRepositoryGetter: Getter<ParentRepository>,
  ) {
    super(Child, dataSource);
    this.parent = this.createBelongsToAccessorFor('parent', parentRepositoryGetter,);
    this.registerInclusionResolver('parent', this.parent.inclusionResolver);
  }
}
