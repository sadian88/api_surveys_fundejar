export declare enum DocumentType {
    IDENTIDAD = "IDENTIDAD",
    CEDULA = "CEDULA",
    PASAPORTE = "PASAPORTE",
    PEP = "PEP"
}
export declare enum GenderType {
    FEMENINO = "FEMENINO",
    MASCULINO = "MASCULINO",
    OTRO = "OTRO"
}
export declare class Registration {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    nationality: string;
    birthDate: string;
    documentType: DocumentType;
    documentNumber: string;
    gender?: GenderType;
    age?: number;
    address?: string;
    phonePrimary: string;
    phoneSecondary?: string;
    email?: string;
    ventureName: string;
    createdAt: Date;
    updatedAt: Date;
}
