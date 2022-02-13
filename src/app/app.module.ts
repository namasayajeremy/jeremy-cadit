import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Navigation related material module
import { NavModule } from './nav.module';
//Component declaration for navigation components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//the actual app related module
import { SalaryConverterModule } from './salary-converter/salary-converter.module';
import { SensorModule } from './sensor/sensor.module';
import { ElectronService } from './core/services';



@NgModule({
  declarations: [
    AppComponent, //navigation
    HomeComponent, //home
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavModule,
    SalaryConverterModule,
    SensorModule,
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent],
})
export class AppModule {}
