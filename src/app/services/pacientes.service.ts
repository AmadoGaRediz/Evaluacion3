// pacientes.service.ts
import { inject, Injectable } from '@angular/core';
import { Paciente } from '../models/pacientes.models';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  // Obtener todos los pacientes
  getPacientes() {
    const pacientesCollection = collection(this.db, 'pacientes');
    return collectionData(pacientesCollection, { idField: 'id' }).pipe(first());
  }

  // Obtener pacientes por doctor
  getPacientesPorDoctor(doctorId: string) {
    const pacientesCollection = collection(this.db, 'pacientes');
    const q = query(pacientesCollection, where('doctorId', '==', doctorId));
    return collectionData(q, { idField: 'id' }).pipe(first());
  }

  // Agregar un paciente
  agregarPaciente(paciente: Paciente) {
    const pacientesCollection = collection(this.db, 'pacientes');
    const pacienteData = {
      nombre: paciente.nombre,
      edad: paciente.edad,
      telefono: paciente.telefono,
      doctorId: paciente.doctorId || null
    };
    return addDoc(pacientesCollection, pacienteData);
  }

  // Modificar un paciente
  modificarPaciente(paciente: Paciente) {
    const documentRef = doc(this.db, 'pacientes', paciente.id);
    return updateDoc(documentRef, {
      nombre: paciente.nombre,
      edad: paciente.edad,
      telefono: paciente.telefono,
      doctorId: paciente.doctorId || null
    });
  }

  // Eliminar un paciente
  eliminarPaciente(paciente: Paciente) {
    const documentoRef = doc(this.db, 'pacientes', paciente.id);
    return deleteDoc(documentoRef);
  }
}