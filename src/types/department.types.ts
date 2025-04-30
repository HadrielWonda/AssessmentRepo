import { Field, InputType } from 'type-graphql';
import { Department } from '../entities/department.entity';
import { SubDepartment } from '../entities/sub-department.entity';

@InputType()
export class CreateDepartmentInput {
  @Field()
  name!: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  subDepartments?: CreateSubDepartmentInput[];
}

@InputType()
export class UpdateDepartmentInput {
  @Field()
  name!: string;
}

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  name!: string;

  @Field()
  departmentId!: number;
}

@InputType()
export class UpdateSubDepartmentInput {
  @Field()
  name!: string;
}