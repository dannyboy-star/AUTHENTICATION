import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({nullable: true})
  dateOfBirth: Date;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  gender: string;

  @Column({nullable: true})
  phoneNumber: string;
  
  @Column({nullable: true})
  nationality: string;

  @Column({nullable: true})
  occupation: string;

  @Column({nullable: true})
  income: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @CreateDateColumn()
  createdAt: Date;

}






