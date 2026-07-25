import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CarService, Car } from './car.service';

@Injectable({ providedIn: 'root' })
export class CarResolver implements Resolve<Car | undefined> {
  private carService = inject(CarService);
  private meta = inject(Meta);
  private title = inject(Title);

  resolve(route: ActivatedRouteSnapshot): Car | undefined {
    const id = route.paramMap.get('id')!;
    const car = this.carService.getById(id);

    if (car) {
      const pageTitle = `${car.brand} ${car.name} ${car.year}`;
      const desc = car.description;
      const img = car.image;
      const url = `https://angular-open.vercel.app/car/${car.id}`;

      this.title.setTitle(pageTitle);
      this.meta.updateTag({ name: 'description', content: desc });
      this.meta.updateTag({ property: 'og:title', content: pageTitle });
      this.meta.updateTag({ property: 'og:description', content: desc });
      this.meta.updateTag({ property: 'og:image', content: img });
      this.meta.updateTag({ property: 'og:url', content: url });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
      this.meta.updateTag({ name: 'twitter:description', content: desc });
      this.meta.updateTag({ name: 'twitter:image', content: img });
    }

    return car;
  }
}
