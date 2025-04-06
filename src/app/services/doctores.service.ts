import { inject, Injectable } from '@angular/core';
import { Doctor } from '../models/doctores.models';
import { first } from 'rxjs';
import { collection, collectionData, deleteDoc, Firestore, doc, getDoc } from '@angular/fire/firestore';
import { addDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  getDoctores() {
    const doctoresCollection = collection(this.db, 'doctores');
    console.log('Obteniendo colección de doctores'); // Depuración
    return collectionData(doctoresCollection, { idField: 'id' }).pipe(first());
  }

  agregarDoctor(doctor: Doctor) {
    const doctoresCollection = collection(this.db, 'doctores');
    const doctorData = {
      nombre: doctor.nombre,
      especialidad: doctor.especialidad,
      telefono: doctor.telefono,
    };
    return addDoc(doctoresCollection, doctorData);
  }

  modificarDoctor(doctor: Doctor) {
    const documentRef = doc(this.db, 'doctores', doctor.id);
    return updateDoc(documentRef, {
      nombre: doctor.nombre,
      especialidad: doctor.especialidad,
      telefono: doctor.telefono,
    });
  }

  eliminarDoctor(doctor: Doctor) {
    const documentoRef = doc(this.db, 'doctores', doctor.id);
    return deleteDoc(documentoRef);
  }

  async doctorExists(doctorId: string): Promise<boolean> {
    if (!doctorId) return false;
    const docRef = doc(this.db, 'doctores', doctorId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }
}