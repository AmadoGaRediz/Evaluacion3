export class Paciente {
    id!: string;           // Un identificador único para el paciente
    nombre!: string;       // Nombre completo del paciente
    edad!: number;         // Edad del paciente
    telefono!: string;     // Número de teléfono del paciente
    doctorId?: string;     // ID del doctor asignado (nuevo campo)
    doctorNombre?: string; // Nombre del doctor (para mostrar, no se guarda en Firestore)
}