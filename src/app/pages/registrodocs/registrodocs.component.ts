import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Doctor } from '../../models/doctores.models';
import { DoctorService } from '../../services/doctores.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-registrodocs',
  imports: [FormsModule],
  templateUrl: './registrodocs.component.html',
  styleUrl: './registrodocs.component.css'
})
export class RegistrodocsComponent {
  // Variables para autenticación
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  
  // Variables para la gestión de doctores
  doctores: any;
  doctor = new Doctor();

  constructor(private doctorService: DoctorService) {
    this.getDoctores();
  }

  // Método para obtener el listado de doctores
  async getDoctores(): Promise<void> {
    this.doctores = await firstValueFrom(this.doctorService.getDoctores());
  }

  // Método para insertar un doctor desde el formulario
  insertarDoctor() {
    if (this.doctor.nombre && this.doctor.especialidad && this.doctor.telefono) {
      this.doctorService.agregarDoctor(this.doctor);
      this.doctor = new Doctor();
      this.getDoctores();
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Método para seleccionar un doctor de la tabla
  selectDoctor(doctorSeleccionado: Doctor) {
    this.doctor = doctorSeleccionado;
  }

  // Método para modificar un doctor desde el formulario
  updateDoctor() {
    if (this.doctor.id && this.doctor.nombre && this.doctor.especialidad && this.doctor.telefono) {
      this.doctorService.modificarDoctor(this.doctor);
      this.doctor = new Doctor();
      this.getDoctores();
    } else {
      alert('Por favor selecciona un doctor para modificar');
    }
  }

  // Método para eliminar un doctor
  deleteDoctor() {
    if (this.doctor.id) {
      this.doctorService.eliminarDoctor(this.doctor);
      this.doctor = new Doctor();
      this.getDoctores();
    } else {
      alert('Por favor selecciona un doctor para eliminar');
    }
  }

  // Método para ayudar a Angular a hacer un seguimiento de los elementos en la tabla
  trackById(index: number, item: Doctor) {
    return item.id;
  }

  // Método para cerrar sesión
  salir() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

}
