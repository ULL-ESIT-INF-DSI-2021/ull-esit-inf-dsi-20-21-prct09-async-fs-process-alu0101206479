
import 'mocha';
import {expect} from 'chai';
import {hola} from '../src/ejercicio-1';

describe('Pruebas de la aplicación y sus clases', ()=> {
  describe('Pruebas clase Nota', ()=> {
    it('expect(notaUno).to.not.be.equal(null);', ()=>{
      expect(hola()).to.be.equal("hola");
    });
  });
});
