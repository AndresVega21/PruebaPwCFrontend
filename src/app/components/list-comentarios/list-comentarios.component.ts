import { Component, OnInit } from '@angular/core';
import { Titulo } from 'src/app/models/titulo.model';
import { responseModel } from 'src/app/models/response.model';
import { ComentarioService } from 'src/app/services/comentarios.services';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {
  listComentarios: Titulo[];
  responseModel: responseModel;
  loading = false;
  constructor(private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.cargarComentario();

  }
    cargarComentario(){
      this.comentarioService.getHeadLines().subscribe(data => {
        this.listComentarios = data;
      })
    }
    eliminarComentario(id:number){
      this.comentarioService.deleteComentario(id).subscribe(data =>{
        this.responseModel= data;
        alert(this.responseModel.mensaje);
        if(this.responseModel.resultado){
            window.location.reload();
        }
      });
    }
    
 
  }




