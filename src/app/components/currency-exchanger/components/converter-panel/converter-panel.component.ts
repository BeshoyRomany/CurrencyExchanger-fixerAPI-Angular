import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Show Details Page
  showDetails(){
    this.router.navigate(['/CurrencyExchangerDetails']);
  }

}
