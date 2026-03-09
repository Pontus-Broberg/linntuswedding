import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { CountdownHeaderComponent } from '../countdown-header/countdown-header.component';

@Component({
  selector: 'app-home',
  imports: [IonButton, RouterLink, CountdownHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
