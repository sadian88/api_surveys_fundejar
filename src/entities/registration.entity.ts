import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

export enum DocumentType {
    IDENTIDAD = 'IDENTIDAD',
    CEDULA = 'CEDULA',
    PASAPORTE = 'PASAPORTE',
    PEP = 'PEP',
}

export enum GenderType {
    FEMENINO = 'FEMENINO',
    MASCULINO = 'MASCULINO',
    OTRO = 'OTRO',
}

@Entity('attendee_registrations')
@Unique(['documentType', 'documentNumber'])
export class Registration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 80 })
    firstName: string;

    @Column({ name: 'middle_name', length: 80, nullable: true })
    middleName?: string;

    @Column({ name: 'last_name', length: 120 })
    lastName: string;

    @Column({ length: 80 })
    nationality: string;

    @Column({ name: 'birth_date', type: 'date' })
    birthDate: string;

    @Column({
        name: 'document_type',
        type: 'enum',
        enum: DocumentType,
    })
    documentType: DocumentType;

    @Column({ name: 'document_number', length: 30 })
    documentNumber: string;

    @Column({
        type: 'enum',
        enum: GenderType,
        nullable: true,
    })
    gender?: GenderType;

    @Column({ type: 'int', nullable: true })
    age?: number;

    @Column({ length: 180, nullable: true })
    address?: string;

    @Column({ name: 'phone_primary', length: 30 })
    phonePrimary: string;

    @Column({ name: 'phone_secondary', length: 30, nullable: true })
    phoneSecondary?: string;

    @Column({ length: 120, nullable: true })
    email?: string;

    @Column({ name: 'venture_name', length: 120 })
    ventureName: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
