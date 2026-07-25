import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarService } from '../car.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-car-list',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <h1>Autos Disponibles</h1>
    <div class="grid">
      @for (car of cars; track car.id) {
        <a [routerLink]="['/car', car.id]" class="card">
          <img [src]="car.image" [alt]="car.name">
          <div class="info">
            <h3>{{ car.brand }} {{ car.name }}</h3>
            <p class="price">{{ car.price | currency:'USD':'symbol':'1.0-0' }}</p>
            <p class="year">{{ car.year }}</p>
          </div>
        </a>
      }
    </div>
  `,
  styles: `
    h1 { text-align: center; margin: 2rem 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; padding: 0 2rem; max-width: 1200px; margin: 0 auto; }
    .card { text-decoration: none; color: inherit; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s; }
    .card:hover { transform: translateY(-4px); }
    .card img { width: 100%; height: 200px; object-fit: cover; }
    .info { padding: 1rem; }
    h3 { margin: 0 0 0.5rem; }
    .price { font-size: 1.25rem; font-weight: bold; color: #2563eb; margin: 0; }
    .year { color: #666; margin: 0.25rem 0 0; }
  `
})
export class CarListComponent {
  cars = inject(CarService).getAll();
}
