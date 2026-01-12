import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { CountdownHeaderComponent } from '../countdown-header/countdown-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IonButton, CountdownHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
}
