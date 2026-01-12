// ...existing code...
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  protected title = 'linntusWedding';

  protected days = 0;
  protected hours = 0;
  protected minutes = 0;
  protected seconds = 0;

  private countdownTimer?: number;
  private target = new Date(2026, 7, 22, 0, 0, 0);

  ngOnInit(): void {
    this.updateCountdown();
    this.countdownTimer = window.setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  private updateCountdown(): void {
    const now = new Date();
    let diff = Math.max(0, this.target.getTime() - now.getTime());
    if (diff <= 0) {
      this.days = this.hours = this.minutes = this.seconds = 0;
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    this.days = Math.floor(totalSeconds / 86400);
    this.hours = Math.floor((totalSeconds % 86400) / 3600);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.seconds = totalSeconds % 60;

  }

  protected pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}