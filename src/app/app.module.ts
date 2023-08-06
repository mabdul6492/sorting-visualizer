import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrayDisplayComponent } from './array-display/array-display.component';
import { ArrayGeneratorService } from './services/array-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    ArrayDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ArrayGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
