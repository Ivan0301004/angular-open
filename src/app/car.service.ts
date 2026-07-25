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
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
    description: 'Sedán eléctrico con alcance de hasta 358 millas y aceleración de 0-60 mph en 3.1 segundos.',
    specs: { engine: 'Eléctrico', horsepower: 283, transmission: 'Automática', fuel: 'Eléctrico' }
  },
  {
    id: 'bmw-m4',
    name: 'M4 Competition',
    brand: 'BMW',
    year: 2024,
    price: 74700,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    description: 'Coupé deportivo con motor twin-turbo de 6 cilindros en línea que entrega 503 caballos de fuerza.',
    specs: { engine: '3.0L Twin-Turbo I6', horsepower: 503, transmission: 'Automática 8 vel.', fuel: 'Gasolina' }
  },
  {
    id: 'mercedes-amg-gt',
    name: 'AMG GT',
    brand: 'Mercedes-Benz',
    year: 2024,
    price: 92600,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
    description: 'Grand Tourer de alto rendimiento con motor biturbo V8 y diseño aerodinámico agresivo.',
    specs: { engine: '4.0L Biturbo V8', horsepower: 523, transmission: 'Automática 9 vel.', fuel: 'Gasolina' }
  },
  {
    id: 'porsche-911',
    name: '911 Carrera S',
    brand: 'Porsche',
    year: 2024,
    price: 117100,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    description: 'El ícono deportivo, motor boxer biturbo con tracción trasera y manejo incomparable.',
    specs: { engine: '3.0L Biturbo Flat-6', horsepower: 443, transmission: 'PDK 8 vel.', fuel: 'Gasolina' }
  },
  {
    id: 'ferrari-roma',
    name: 'Roma',
    brand: 'Ferrari',
    year: 2024,
    price: 269560,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
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
