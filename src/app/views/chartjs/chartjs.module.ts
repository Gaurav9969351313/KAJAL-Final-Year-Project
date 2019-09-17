import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    AccordionModule, OrderListModule
  ],
  declarations: [ChartJSComponent]
})
export class ChartJSModule {

}
