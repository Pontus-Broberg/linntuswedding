import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountdownHeaderComponent } from '../countdown-header/countdown-header.component';

interface Hotel {
  id: string;
  name: string;
  image: string;
  description: string;
  mapsLink: string;
  bookingLink?: string;
  bookingLinkText?: string;
  bookingGuide?: {
    title: string;
    steps: string[];
  };
}

@Component({
  selector: 'app-home',
  imports: [CountdownHeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  menuOpen = false;

  hotels: Hotel[] = [
    {
      id: 'klockargarden',
      name: 'Klockargården',
      image: 'assets/klockargarden.png',
      description:
        'Klockargården ligger mitt i Öregrund med utsikt över den ikoniska klockstapeln. Här finns en jättefin innergård med bubbelpool och en liten takterrass.',
      mapsLink: 'https://maps.google.com/?q=Klockargården+Öregrund',
      bookingLink: 'https://www.klockargarden.nu/boka-hotellrum/',
      bookingLinkText: 'Boka Klockargården',
      bookingGuide: {
        title: 'Hur man bokar:',
        steps: [
          'Uppge koden ”<strong>Linntus2026</strong>” i fältet för kod som hittas under datum.',
          'Aktivera koden genom att trycka på pilen just bredvid (det kommer stå fel datum, men först nu går det att välja rätt datum)',
          'Välj datum och därefter rumskategori och boka som vanligt!',
        ],
      },
    },
    {
      id: 'flora',
      name: 'Hotell Flora',
      image: 'assets/hotell-flora.png',
      description:
        'Hotell Flora är från förra sekelskiftet och har genomgått en varsam invändig totalrenovering under de senaste åren. Den gamla trädgården är en skön lummig oas att vara och njuta i.',
      mapsLink: 'https://maps.google.com/?q=Hotell+Flora+Öregrund',
      bookingLink: 'https://hotellflora.se/',
      bookingLinkText: 'Boka Hotell Flora',
      bookingGuide: {
        title: 'Hur man bokar:',
        steps: [
          'Klicka på "Bokning" i menyn till vänster',
          'Fyll i alla uppgifter för ert boende',
          'I fältet övrigt måste ni skriva ”<strong>Linnea/Pontus</strong>” som referens',
        ],
      },
    },
    {
      id: 'epokgarden',
      name: 'Epokgården',
      image: 'assets/epokgarden.png',
      description:
        'Epokgården är ett charmigt lägenhetshotell och vandrarhem som passar dig som uppskattar vänlig och personlig service, inbjudande rum och en avkopplande trädgård.',
      mapsLink: 'https://maps.google.com/?q=Epokgården+Öregrund',
      bookingLink: 'https://www.epokgarden.se/boka/',
      bookingLinkText: 'Boka Epokgården',
      bookingGuide: {
        title: 'Hur man bokar:',
        steps: [
          'Uppge koden ”<strong>PONTUS&amp;LINNEA</strong>” i fältet för kod som hittas under datum.',
          'Aktivera koden genom att trycka på pilen just bredvid (det kommer stå fel datum, men först nu går det att välja rätt datum)',
          'Välj datum och därefter rumskategori och boka som vanligt!',
        ],
      },
    },
  ];

  selectedHotel: Hotel = this.hotels[0];

  selectHotel(hotel: Hotel): void {
    this.selectedHotel = hotel;
  }

  scrollTo(id: string): void {
    this.menuOpen = false;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
