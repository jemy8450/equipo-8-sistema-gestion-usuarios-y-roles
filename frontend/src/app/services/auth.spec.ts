import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth'; // 1. Cambiamos 'Auth' por 'AuthService'

describe('AuthService', () => { // 2. Actualizamos la descripción
  let service: AuthService; // 3. Cambiamos el tipo de variable

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService); // 4. Inyectamos el nombre correcto
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});