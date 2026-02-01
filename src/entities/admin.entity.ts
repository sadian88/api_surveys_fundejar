import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    username: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ default: 'ADMIN', length: 20 })
    role: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
