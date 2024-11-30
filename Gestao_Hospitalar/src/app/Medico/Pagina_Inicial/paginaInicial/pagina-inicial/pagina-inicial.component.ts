import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent {
   
  isLeftContainerVisible = true;

  toggleLeftContainer() {
    this.isLeftContainerVisible = !this.isLeftContainerVisible;
  }
}
