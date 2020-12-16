import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Titulo } from 'src/app/models/titulo.model';
import { ComentarioService } from 'src/app/services/comentarios.services';

@Component({
  selector: 'app-ver-comentarios',
  templateUrl: './ver-comentarios.component.html',
  styleUrls: ['./ver-comentarios.component.css']
})
export class VerComentariosComponent implements OnInit {
  idComentario = 0;
  comentario:Titulo;
  canLoad: boolean;
  constructor(private route: ActivatedRoute,private _comentariosService : ComentarioService,
    private _router : Router) { }

  ngOnInit(): void {
     if (+this.route.snapshot.paramMap.get('id') > 0) {
      this.idComentario = +this.route.snapshot.paramMap.get('id');
      if(this.idComentario >0){
        this._comentariosService.cargarComentario(this.idComentario).subscribe(data=>{
          this.comentario = data;
          this.canLoad = true;
        });
      }
      else{
        this._router.navigate(['/']);
      }
    }
  }
  volver(){
    this._router.navigate(['/']);
  }

}
