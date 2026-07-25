import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CarService, Car } from '../car.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  imports: [RouterLink, CurrencyPipe],
  template: `
    @if (car) {
      <div class="container">
        <a routerLink="/" class="back">← Volver</a>
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
    .back { display: inline-block; margin-bottom: 1rem; color: #2563eb; text-decoration: none; }
    .back:hover { text-decoration: underline; }
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
  private carService = inject(CarService);
  private meta = inject(Meta);
  private title = inject(Title);

  car: Car | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.car = this.carService.getById(id);

    if (this.car) {
      const title = `${this.car.brand} ${this.car.name} ${this.car.year}`;
      const desc = this.car.description;
      const img = this.car.image;

      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: desc });

      // OG tags - crawlers read these from SSR HTML
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: desc });
      this.meta.updateTag({ property: 'og:image', content: img });
      this.meta.updateTag({ property: 'og:type', content: 'website' });

      // Twitter Card
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: desc });
      this.meta.updateTag({ name: 'twitter:image', content: img });
    }
  }
}
