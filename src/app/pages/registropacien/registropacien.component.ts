import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Paciente } from '../../models/pacientes.models';
import { PacienteService } from '../../services/pacientes.service';
import { DoctorService } from '../../services/doctores.service';
import { Doctor } from '../../models/doctores.models';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registropacien',
  templateUrl: './registropacien.component.html',
  styleUrls: ['./registropacien.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class RegistroPacienComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  
  pacientes: any[] = [];
  doctores: Doctor[] = [];
  paciente = new Paciente();

  constructor(
    private pacienteService: PacienteService,
    private doctorService: DoctorService
  ) {
    console.log('Iniciando componente...');
    this.loadDoctores().then(() => {
      console.log('Doctores cargados:', this.doctores);
    });
    this.getPacientes();
  }

  async loadDoctores(): Promise<void> {
    try {
      const doctores = await firstValueFrom(this.doctorService.getDoctores());
      console.log('Doctores cargados:', doctores); // Para depuración
      this.doctores = doctores as Doctor[];
    } catch (error) {
      console.error('Error al cargar doctores:', error);
      this.doctores = []; // Asegurar que no sea undefined
    }
  }

  async getPacientes(): Promise<void> {
    const pacientes = await firstValueFrom(this.pacienteService.getPacientes());
    this.pacientes = await this.enriquecerPacientesConDoctores(pacientes);
  }

  private async enriquecerPacientesConDoctores(pacientes: any[]): Promise<any[]> {
    const doctores = await firstValueFrom(this.doctorService.getDoctores());
    
    return pacientes.map(paciente => {
      const doctor = doctores.find((d: any) => d['id'] === paciente['doctorId']);
      return {
        ...paciente,
        doctorNombre: doctor ? doctor['nombre'] : 'Sin doctor asignado',
        doctorEspecialidad: doctor ? doctor['especialidad'] : ''
      };
    });
  }
  // Insertar paciente
  insertarPaciente(): void {
    if (this.paciente.nombre && this.paciente.edad && this.paciente.telefono) {
      this.pacienteService.agregarPaciente(this.paciente);
      this.paciente = new Paciente();
      this.getPacientes();
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Seleccionar paciente
  selectPaciente(pacienteSeleccionado: Paciente): void {
    this.paciente = { ...pacienteSeleccionado }; // Clonar para evitar referencias directas
  }

  // Actualizar paciente
  updatePaciente(): void {
    if (this.paciente.id && this.paciente.nombre && this.paciente.edad && this.paciente.telefono) {
      this.pacienteService.modificarPaciente(this.paciente);
      this.paciente = new Paciente();
      this.getPacientes();
    } else {
      alert('Por favor selecciona un paciente para modificar');
    }
  }

  // Eliminar paciente
  deletePaciente(): void {
    if (this.paciente.id) {
      this.pacienteService.eliminarPaciente(this.paciente);
      this.paciente = new Paciente();
      this.getPacientes();
    } else {
      alert('Por favor selecciona un paciente para eliminar');
    }
  }

  // Para trackear los items en el *ngFor
  trackById(index: number, item: Paciente): string {
    return item.id;
  }

  // Redirigir al home
  regresar(): void {
    this.router.navigate(['/home']);
  }

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
}
