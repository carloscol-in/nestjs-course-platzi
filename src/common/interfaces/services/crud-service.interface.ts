import { IEntity } from 'src/common/interfaces/entities/entity.interface';
import { IDto } from '../dtos/dto.interface';

export interface ICrudService<ID> {
  findAll(): Promise<Array<IEntity>>;

  findOne(id: ID): Promise<IEntity>;

  create(payload: IDto): Promise<IEntity>;

  update(id: ID, payload: IDto): Promise<IEntity>;

  delete(id: ID): Promise<void>;
}
