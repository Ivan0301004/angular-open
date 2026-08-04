import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Car } from '../car.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  imports: [RouterLink, CurrencyPipe],
  template: `
    @if (car) {
      <div class="container">
        <div class="top-bar">
          <a routerLink="/" class="back">← Volver</a>
          <button class="share-btn" (click)="share()">
            {{ copied ? 'Copiado!' : 'Compartir' }}
          </button>
        </div>
        <div class="detail">
          <img [src]="car.image" [alt]="car.name">
          <div class="info">
            <h1>{{ car.brand }} {{ car.name }}</h1>
            <p class="price">{{ car.price | currency:'USD':'symbol':'1.0-0' }}</p>
            <p class="description">{{ car.description }}</p>
            <div class="specs">
              <div><strong>Motor:</strong> {{ car.specs.engine }}</div>
              <div><strong>HP:</strong> {{ car.specs.horsepower }}</div>
              <div><strong>Transmisión:</strong> {{ car.specs.transmission }}</div>
              <div><strong>Combustible:</strong> {{ car.specs.fuel }}</div>
            </div>
            <p class="year">{{ car.year }}</p>
          </div>
        </div>
      </div>
    } @else {
      <div class="not-found">
        <h1>Auto no encontrado</h1>
        <a routerLink="/">Ver catálogo</a>
      </div>
    }
  `,
  styles: `
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .back { color: #2563eb; text-decoration: none; }
    .back:hover { text-decoration: underline; }
    .share-btn { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem; }
    .share-btn:hover { background: #1d4ed8; }
    .detail { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .detail img { width: 100%; border-radius: 12px; object-fit: cover; max-height: 400px; }
    h1 { margin: 0 0 0.5rem; }
    .price { font-size: 1.5rem; font-weight: bold; color: #2563eb; margin: 0 0 1rem; }
    .description { line-height: 1.6; color: #333; }
    .specs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin: 1.5rem 0; padding: 1rem; background: #f5f5f5; border-radius: 8px; }
    .year { color: #666; margin: 0; }
    .not-found { text-align: center; padding: 4rem 2rem; }
    .not-found a { color: #2563eb; }
    @media (max-width: 600px) { .detail { grid-template-columns: 1fr; } }
  `
})
export class CarDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  car: Car | undefined;
  copied = false;

  ngOnInit() {
    this.car = this.route.snapshot.data['car'];
  }

  share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `${this.car?.brand} ${this.car?.name}`, url });
    } else {
      navigator.clipboard.writeText(url);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }
  }
}
