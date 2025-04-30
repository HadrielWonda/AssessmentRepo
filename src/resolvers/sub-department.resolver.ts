import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { SubDepartment } from '../entities/sub-department.entity';
import { SubDepartmentService } from '../services/sub-department.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { CreateSubDepartmentInput, UpdateSubDepartmentInput } from '../types/department.types';

@Resolver()
export class SubDepartmentResolver {
  constructor(private readonly subDepartmentService: SubDepartmentService) {}

  @UseMiddleware(authMiddleware)
  @Mutation(() => SubDepartment)
  async createSubDepartment(
    @Arg('input') input: CreateSubDepartmentInput
  ): Promise<SubDepartment> {
    return this.subDepartmentService.createSubDepartment(input);
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => SubDepartment)
  async updateSubDepartment(
    @Arg('id') id: number,
    @Arg('input') input: UpdateSubDepartmentInput
  ): Promise<SubDepartment> {
    return this.subDepartmentService.updateSubDepartment(id, input);
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => Boolean)
  async deleteSubDepartment(@Arg('id') id: number): Promise<boolean> {
    return this.subDepartmentService.deleteSubDepartment(id);
  }
}