import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { WarehouseComponent } from './teippo/warehouse/warehouse/warehouse.component';
import { NewWarehouseComponent } from './teippo/warehouse/new-warehouse/new-warehouse.component';
import { EditWarehouseComponent } from './teippo/warehouse/edit-warehouse/edit-warehouse.component';
import { DeleteWarehouseComponent } from './teippo/warehouse/delete-warehouse/delete-warehouse.component';
import { HomeComponent } from './teippo/home/home.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbCardModule,
  ],
  declarations: [
    PagesComponent,
    WarehouseComponent,
    NewWarehouseComponent,
    EditWarehouseComponent,
    DeleteWarehouseComponent,
    HomeComponent,
  ],
})
export class PagesModule {
}
