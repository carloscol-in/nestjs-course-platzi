import { User } from 'src/users/entities/user.entity';
import { IEntity } from 'src/common/interfaces/entities/entity.interface';

export class Order {
  date: Date;
  user: User;
  products: IEntity[]; // TODO: change to IProduct
}
