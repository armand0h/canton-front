import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../interfaces/equipos.interface';
import { Usuario } from '../../interfaces/usuarios.interface';

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
  

  constructor( private fb: FormBuilder, 
              private EquiposService: EquiposService ) { }

  ngOnInit(): void {

    // Listado de equipos
    this.EquiposService.getEquipos()
      .subscribe( teams => {
        console.log(teams);
        this.equipos = teams;
      });

    // Cuando cambie el equipo
    this.miFormulario.get('equipo')?.valueChanges
      .subscribe( equipo => {
        console.log(equipo);
        // llamo el servicio
        this.EquiposService.getUsuariosPorEquipo( equipo )
          .subscribe( users => {
            console.log(users);
            this.usuarios = users;
          })
      });
  }



  guardar() {
    console.log(this.miFormulario.value);
  }

}
