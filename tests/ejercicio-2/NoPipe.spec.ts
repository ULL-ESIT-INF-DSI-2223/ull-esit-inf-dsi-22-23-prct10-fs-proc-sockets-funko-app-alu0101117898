import { expect } from 'chai';
import { NoPipe } from './../../src/ejercicio-2/Nopipe.js';
import fs from 'fs';


describe('NoPipe', () => {
  let noPipe: NoPipe;

  beforeEach(() => {
    noPipe = new NoPipe();
  });

  describe('contarLineas', () => {
    it('devuelve un mensaje de error si el archivo no existe', () => {
      const resultado = noPipe.contarLineas('archivo-inexistente.txt');
      expect(resultado).equal('El fichero archivo-inexistente.txt no existe');
    });

    it('devuelve el número de líneas si el archivo existe', () => {
      const resultado = noPipe.contarLineas('helloworld.txt');
      expect(resultado).equal('El fichero helloworld.txt tiene 1 lineas');
    });
  });

  describe('contarPalabras', () => {
    it('devuelve un mensaje de error si el archivo no existe', () => {
      const resultado = noPipe.contarPalabras('archivo-inexistente.txt');
      expect(resultado).equal('El fichero archivo-inexistente.txt no existe');
    });

    it('devuelve el número de palabras si el archivo existe', () => {
      const resultado = noPipe.contarPalabras('helloworld.txt');
      expect(resultado).equal('El fichero helloworld.txt tiene 3 palabras');
    });
  });

  describe('contarCaracteres', () => {
    it('devuelve un mensaje de error si el archivo no existe', () => {
      const resultado = noPipe.contarCaracteres('archivo-inexistente.txt');
      expect(resultado).equal('El fichero archivo-inexistente.txt no existe');
    });

    it('devuelve el número de caracteres si el archivo existe', () => {
      const resultado = noPipe.contarCaracteres('helloworld.txt');
      expect(resultado).equal('El fichero helloworld.txt tiene 20 caracteres');
    });
  })

  describe('contarTodo', () => {
    it('devuelve un mensaje de error si el archivo no existe', () => {
      const resultado = noPipe.contarTodo('archivo-inexistente.txt');
      expect(resultado).equal('El fichero archivo-inexistente.txt no existe');
    });

    it('devuelve el número de líneas, palabras y caracteres si el archivo existe', () => {
      const resultado = noPipe.contarTodo('helloworld.txt');
      expect(resultado).equal('El fichero helloworld.txt tiene 1 lineas\nEl fichero helloworld.txt tiene 3 palabras\nEl fichero helloworld.txt tiene 20 caracteres');
    });
  })

});