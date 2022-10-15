import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedCurrencies } from '../../models/selectedCurrencies.model';
import { CurrencyMessangerService } from '../../services/currency-messanger.service';

@Component({
  selector: 'converted-currency-details',
  templateUrl: './converted-currency-details.component.html',
  styleUrls: ['./converted-currency-details.component.scss'],
})
export class ConvertedCurrencyDetailsComponent implements OnInit, OnChanges {
  detailsData!: SelectedCurrencies;
  isDetails = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getSelectedCurrencies();
  }

  ngOnInit(): void {
    this.getSelectedCurrencies();
  }
  getSelectedCurrencies() {
    //Check if data stored in history
    if (history.state.data) {
      //Get the stored data from state history
      this.detailsData = history.state.data;
      this.isDetails = true;
    } else {
      this.router.navigate(['/']);
    }
  }

  onSelectedCurrencies(selectedCurrencies: SelectedCurrencies){
    this.detailsData = selectedCurrencies;
    this.changeDetectorRef.detectChanges();
  }
}
