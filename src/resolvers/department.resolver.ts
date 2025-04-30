import {
    Arg,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
    Field,
    InputType,
  } from 'type-graphql';
  import { Department } from '../entities/department.entity';
  import { SubDepartment } from '../entities/sub-department.entity';
  import { DepartmentService } from '../services/department.service';
  import { authMiddleware } from '../middleware/auth.middleware';
  
  @InputType()
  class SubDepartmentInput {
    @Field()
    name!: string;
  }
  
  @InputType()
  class CreateDepartmentInput {
    @Field()
    name!: string;
  
    @Field(() => [SubDepartmentInput], { nullable: true })
    subDepartments?: SubDepartmentInput[];
  }
  
  @Resolver()
  export class DepartmentResolver {
    constructor(private readonly departmentService: DepartmentService) {}
  
    @UseMiddleware(authMiddleware)
    @Mutation(() => Department)
    async createDepartment(
      @Arg('input') input: CreateDepartmentInput
    ): Promise<Department> {
      return this.departmentService.createDepartment(input);
    }
  
    @UseMiddleware(authMiddleware)
    @Query(() => [Department])
    async getDepartments(): Promise<Department[]> {
      return this.departmentService.getAllDepartments();
    }
  }