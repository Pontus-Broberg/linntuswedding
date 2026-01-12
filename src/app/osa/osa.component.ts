import { Component } from '@angular/core';
import { CountdownHeaderComponent } from '../countdown-header/countdown-header.component';

@Component({
  selector: 'app-osa',
  standalone: true,
  imports: [CountdownHeaderComponent],
  templateUrl: './osa.component.html',
  styleUrls: ['./osa.component.scss']
})
export class OsaComponent {
}
