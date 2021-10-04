import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../interfaces/equipos.interface';
import { Usuario } from '../../interfaces/usuarios.interface';
import { Venta } from '../../interfaces/ventas.interface';


@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.sass']
})
export class SelectorPageComponent implements OnInit {

  // Control del formulario
  miFormulario: FormGroup = this.fb.group({
    equipo:  ['0', Validators.required],
    usuario: ['0', Validators.required],
  })

  // Data para selectores
  equipos: Equipo[] = [];
  usuarios: Usuario[] = [];
  ventas:   Venta[] = []
  

  constructor( private fb: FormBuilder, 
              private EquiposService: EquiposService ) { }

  ngOnInit(): void {

    // Listado de equipos
    this.EquiposService.getEquipos()
      .subscribe( teams => {
        //console.log(teams);
        this.equipos = teams;
      });

    // Listado de usuarios completo al iniciar la app
    this.EquiposService.getUsuarios()
      .subscribe( users => {
        //console.log(users);
        this.usuarios = users;
      });

    // Cuando cambie el equipo cambian los usuarios
    this.miFormulario.get('equipo')?.valueChanges
      .pipe(
        // reiniciar el valor del siguiente select
        tap( (_) => {
          this.miFormulario.get('usuario')?.reset('0');
        }),
        switchMap( equipo => this.EquiposService.getUsuariosPorEquipo( equipo ) )
      )
      .subscribe( users => {
        this.usuarios = users;
      });
  }



  buscar() {
    const equipoId = this.miFormulario.controls['equipo'].value;
    const usuarioId   = this.miFormulario.controls['usuario'].value

    // Busca información para llenar las ventas
    this.EquiposService.getVentas( equipoId, usuarioId )
      .subscribe( sales => {
        //console.log(sales);
        this.ventas = sales;
      });
  }

}
