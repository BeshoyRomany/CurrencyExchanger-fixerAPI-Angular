import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectedCurrencies } from './models/selectedCurrencies.model';

@Component({
  selector: 'currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {
  selectedCurrencies!: SelectedCurrencies;
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  onSelectedCurrencies(selectedCurrencies: SelectedCurrencies){
    this.selectedCurrencies = selectedCurrencies;
    this.changeDetectorRef.detectChanges();
  }

}
