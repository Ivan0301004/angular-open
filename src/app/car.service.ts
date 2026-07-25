import { Injectable } from '@angular/core';

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  description: string;
  specs: {
    engine: string;
    horsepower: number;
    transmission: string;
    fuel: string;
  };
}

// ponytail: hardcode data, add API when you have real inventory
const CARS: Car[] = [
  {
    id: 'tesla-model-3',
    name: 'Model 3',
    brand: 'Tesla',
    year: 2024,
    price: 42990,
    image: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-3-Desktop-LHD.jpg',
    description: 'Sedán eléctrico con alcance de hasta 358 millas y aceleración de 0-60 mph en 3.1 segundos.',
    specs: { engine: 'Eléctrico', horsepower: 283, transmission: 'Automática', fuel: 'Eléctrico' }
  },
  {
    id: 'bmw-m4',
    name: 'M4 Competition',
    brand: 'BMW',
    year: 2024,
    price: 74700,
    image: 'https://www.bmw.com.mx/content/dam/bmw/common/all-models/m-series/m4-coupe/2024/highlights/bmw-m-series-m4-coupe-hero.jpg',
    description: 'Coupé deportivo con motor twin-turbo de 6 cilindros en línea que entrega 503 caballos de fuerza.',
    specs: { engine: '3.0L Twin-Turbo I6', horsepower: 503, transmission: 'Automática 8 vel.', fuel: 'Gasolina' }
  },
  {
    id: 'mercedes-amg-gt',
    name: 'AMG GT',
    brand: 'Mercedes-Benz',
    year: 2024,
    price: 92600,
    image: 'https://www.mercedes-benz.com.mx/content/dam/mb-nft/mx/models/passenger-cars/amg-gt/01-mercedes-amg-gt.jpg',
    description: 'Grand Tourer de alto rendimiento con motor biturbo V8 y diseño aerodinámico agresivo.',
    specs: { engine: '4.0L Biturbo V8', horsepower: 523, transmission: 'Automática 9 vel.', fuel: 'Gasolina' }
  },
  {
    id: 'porsche-911',
    name: '911 Carrera S',
    brand: 'Porsche',
    year: 2024,
    price: 117100,
    image: 'https://files.porsche.com/filestore/image/multimedia/none/992-gt2-rs-stage-image-01/optimized/f99ef426-e3b7-11ed-80f5-005056be2068.jpg',
    description: 'El ícono deportivo, motor boxer biturbo con tracción trasera y manejo incomparable.',
    specs: { engine: '3.0L Biturbo Flat-6', horsepower: 443, transmission: 'PDK 8 vel.', fuel: 'Gasolina' }
  },
  {
    id: 'ferrari-roma',
    name: 'Roma',
    brand: 'Ferrari',
    year: 2024,
    price: 269560,
    image: 'https://www.ferrari.com/en-EN/auto/ferrari-roma',
    description: 'GT elegante con motor V8 turbo que captura la esencia de la dolce vita italiana.',
    specs: { engine: '3.9L Twin-Turbo V8', horsepower: 612, transmission: 'DCT 8 vel.', fuel: 'Gasolina' }
  }
];

@Injectable({ providedIn: 'root' })
export class CarService {
  getAll(): Car[] {
    return CARS;
  }

  getById(id: string): Car | undefined {
    return CARS.find(c => c.id === id);
  }
}
