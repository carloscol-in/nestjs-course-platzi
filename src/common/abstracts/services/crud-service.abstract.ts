import { NotFoundException } from '@nestjs/common';
import { ICreateDto } from 'src/common/interfaces/dtos/create.interface';
import { IUpdateDto } from 'src/common/interfaces/dtos/update.interface';
import { IEntity } from 'src/common/interfaces/entities/entity.interface';
import { ICrudService } from 'src/common/interfaces/services/crud-service.interface';
import { Repository } from 'typeorm';

export abstract class AbstractCrudService<ID> implements ICrudService<ID> {
  constructor(private readonly repository: Repository<IEntity>) {
    this.repository = repository;
  }

  async findAll(): Promise<Array<IEntity>> {
    return await this.repository.find();
  }

  async findOne(id: ID): Promise<IEntity> {
    const entity = await this.repository.findOne(id);

    if (!entity) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    return entity;
  }

  async create(payload: ICreateDto): Promise<IEntity> {
    const newEntity = this.repository.create(payload);

    return await this.repository.save(newEntity);
  }

  async update(id: ID, payload: IUpdateDto): Promise<IEntity> {
    const entity = await this.findOne(id);

    this.repository.merge(entity, payload);

    return await this.repository.save(entity);
  }

  async delete(id: ID): Promise<void> {
    const entity = await this.findOne(id);

    await this.repository.remove(entity);

    return;
  }
}
