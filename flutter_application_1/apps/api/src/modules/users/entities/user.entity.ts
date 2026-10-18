import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  COMPANY = 'company',
  DRIVER = 'driver',
  SUPERVISOR = 'supervisor',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  fullName!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @Column({ nullable: true })
  email?: string;

  @Column({ select: false })
  passwordHash!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
