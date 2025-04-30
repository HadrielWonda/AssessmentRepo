import { CreateDepartmentInput } from '../resolvers/department.resolver';
import { Department } from '../entities/department.entity';
import { SubDepartment } from '../entities/sub-department.entity';
import { AppDataSource } from '../data-source';


export class DepartmentService {
  private departmentRepository = AppDataSource.getRepository(Department);
  private subDepartmentRepository = AppDataSource.getRepository(SubDepartment);

  async createDepartment(input: CreateDepartmentInput): Promise<Department> {
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const department = new Department();
      department.name = input.name;

      const savedDepartment = await transactionalEntityManager.save(department);

      if (input.subDepartments?.length) {
        const subDepartments = input.subDepartments.map((sub) => {
          const newSub = new SubDepartment();
          newSub.name = sub.name;
          newSub.department = savedDepartment;
          return newSub;
        });

        await transactionalEntityManager.save(subDepartments);
      }

      const createdDepartment = await this.departmentRepository.findOne({
        where: { id: savedDepartment.id },
        relations: ['subDepartments'],
      });

      if (!createdDepartment) {
        throw new Error('Department not found after creation');
      }

      return createdDepartment;
    });
  }

  async getAllDepartments(): Promise<Department[]> {
    return this.departmentRepository.find({
      relations: ['subDepartments'],
    });
  }

  async updateDepartment(id: number, name: string): Promise<Department> {
    await this.departmentRepository.update(id, { name });
    return this.departmentRepository.findOneOrFail({
      where: { id },
      relations: ['subDepartments']
    });
  }
  
  async deleteDepartment(id: number): Promise<boolean> {
    const result = await this.departmentRepository.delete(id);
    return result.affected! > 0;
  }
}