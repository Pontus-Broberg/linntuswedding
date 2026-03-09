import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-countdown-header',
  templateUrl: './countdown-header.component.html',
  styleUrl: './countdown-header.component.scss'
})
export class CountdownHeaderComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly target = new Date(2026, 7, 22, 0, 0, 0); // Aug 22, 00:00

  protected readonly days = signal(0);
  protected readonly hours = signal(0);
  protected readonly minutes = signal(0);
  protected readonly seconds = signal(0);

  protected readonly paddedHours = computed(() => this.pad(this.hours()));
  protected readonly paddedMinutes = computed(() => this.pad(this.minutes()));
  protected readonly paddedSeconds = computed(() => this.pad(this.seconds()));

  ngOnInit(): void {
    this.updateCountdown();
    const timer = setInterval(() => this.updateCountdown(), 1000);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  private updateCountdown(): void {
    const now = new Date();
    const diff = Math.max(0, this.target.getTime() - now.getTime());

    if (diff <= 0) {
      this.days.set(0);
      this.hours.set(0);
      this.minutes.set(0);
      this.seconds.set(0);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    this.days.set(Math.floor(totalSeconds / 86400));
    this.hours.set(Math.floor((totalSeconds % 86400) / 3600));
    this.minutes.set(Math.floor((totalSeconds % 3600) / 60));
    this.seconds.set(totalSeconds % 60);
  }

  private pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
}
