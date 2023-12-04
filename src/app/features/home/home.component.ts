import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
    const botoes = document.querySelectorAll(".card-btn");
    botoes.forEach((botao) => {
      botao.addEventListener('click', () =>{
        this.unselectBtn();
        botao.classList.add("card-selecionado");
      })
    })  
  }


  movetoInfo(){
    document.querySelector('#info')!.scrollIntoView({behavior: 'smooth'});
  }

  cardBtnSelect(color: string){
    let cards = document.querySelector("#cards-img") as HTMLImageElement;
    cards!.src = `assets/img/cards-${color}.png`;
  }

  unselectBtn(){
    const selectedBtn = document.querySelector(".card-btn.card-selecionado")
    selectedBtn?.classList.remove("card-selecionado")
  }
}
