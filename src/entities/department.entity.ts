// src/entities/department.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @OneToMany(() => SubDepartment, (sub) => sub.department, {
    cascade: true,
  })
  subDepartments: SubDepartment[] = [];
}