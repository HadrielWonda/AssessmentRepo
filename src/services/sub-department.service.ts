import { SubDepartment } from '../entities/sub-department.entity';
import { AppDataSource } from '../data-source';
import { CreateSubDepartmentInput, UpdateSubDepartmentInput } from '../types/department.types';

export class SubDepartmentService {
  private subDepartmentRepository = AppDataSource.getRepository(SubDepartment);

  async createSubDepartment(input: CreateSubDepartmentInput): Promise<SubDepartment> {
    const subDepartment = this.subDepartmentRepository.create(input);
    return this.subDepartmentRepository.save(subDepartment);
  }

  async updateSubDepartment(id: number, input: UpdateSubDepartmentInput): Promise<SubDepartment> {
    await this.subDepartmentRepository.update(id, input);
    const updated = await this.subDepartmentRepository.findOneBy({ id });
    if (!updated) throw new Error('Sub-department not found');
    return updated;
  }

  async deleteSubDepartment(id: number): Promise<boolean> {
    const result = await this.subDepartmentRepository.delete(id);
    return result.affected! > 0;
  }
}