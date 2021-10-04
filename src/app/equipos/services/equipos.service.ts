import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipos.interface';
import { Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  // URL para consulta de usuarios por equipo
  private baseUrl: string = 'http://localhost:8080';

  // TODO cambiar por el servicio http
  private _equipos: string[] = ["1", "2"];

  get equipos(): string[] {
    return [...this._equipos];
  }

  constructor( private http:HttpClient ) { }

  // Traerl istado de equipos
  getEquipos( ): Observable<Equipo[]> {
    const url: string = `${ this.baseUrl }/teams`;
    // Data de los equipos
    return this.http.get<Equipo[]>(url);
  }

  // Traer usuarios por equipo
  getUsuariosPorEquipo( equipo:string ): Observable<Usuario[]> {
    const url: string = `${ this.baseUrl }/users/team/${ equipo }`;
    // Data de los usuarios
    return this.http.get<Usuario[]>( url );
  }
}
