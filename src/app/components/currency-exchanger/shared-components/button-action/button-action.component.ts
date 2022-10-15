import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonActions } from '../../enum/buttonActions.enum';
import { SelectedCurrencies } from '../../models/selectedCurrencies.model';

@Component({
  selector: 'button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss']
})
export class ButtonActionComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() action!: string | number;
  @Input() data!: {} | [] | string | number;
  @Input() route: string = '';
  @Input() icon: string = '';
  constructor(private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }

  doAction(){
    //Go Details Page to Convert Currencies 
    if(this.action == ButtonActions.convertCurrencies){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        this.router.navigate([this.route], {state: {data: this.data}});
      })
      
    }
  }

}
