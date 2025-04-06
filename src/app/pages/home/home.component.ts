import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Doctor } from '../../models/doctores.models';
import { DoctorService } from '../../services/doctores.service';
import { Paciente } from '../../models/pacientes.models';
import { PacienteService } from '../../services/pacientes.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  async getPacientes(): Promise<void> {
    const pacientes = await firstValueFrom(this.pacienteService.getPacientes());
    const doctores = await firstValueFrom(this.doctorService.getDoctores());
    
    this.pacientes = pacientes.map((paciente: any) => {
      const doctor = doctores.find((d: any) => d['id'] === paciente['doctorId']);
      return {
        ...paciente,
        doctorNombre: doctor ? doctor['nombre'] : 'Sin asignar'
      };
    });
  }



  // Autenticación y navegación
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  // Gestión de doctores
  doctores: any;
  doctor = new Doctor();

  // Gestión de pacientes
  pacientes: any;
  paciente = new Paciente();

  constructor(
    private doctorService: DoctorService,
    private pacienteService: PacienteService
  ) {
    this.getDoctores();
    this.getPacientes();
  }

  // Obtener lista de doctores
  async getDoctores(): Promise<void> {
    this.doctores = await firstValueFrom(this.doctorService.getDoctores());
  }

 

  // TrackBy para mejorar rendimiento de *ngFor
  trackById(index: number, item: { id: number }) {
    return item.id;
  }

  // Redirección a módulos de registro
  redirectToRegistroDocs() {
    this.router.navigate(['/registrodocs']);
  }

  redirectToRegistroPacientes() {
    this.router.navigate(['/registropacien']);
  }

  // Cierre de sesión
  salir() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['']),
      error: (error) => console.error('Error al cerrar sesión:', error)
    });
  }


  
}
