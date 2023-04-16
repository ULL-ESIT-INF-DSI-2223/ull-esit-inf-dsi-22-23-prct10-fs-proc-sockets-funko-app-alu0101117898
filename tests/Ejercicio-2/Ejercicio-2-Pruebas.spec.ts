import 'mocha'
import { expect } from 'chai'
import { Pipe } from '../../src/Ejercicio-2/Pipe.js'
import { NoPipe} from '../../src/Ejercicio-2/NoPipe.js'

describe('--Ejercicio 2 pruebas--', () => {

  const usoPipe = new Pipe('.eslintignore')

  it('usoPipe debe ser una instancia de Pipe.', () => {
    expect(usoPipe).to.be.an.instanceOf(Pipe)
  })

  it('usoPipe está compuesto de 4 líneas.', () => {
    usoPipe.lineas((l) => {
      expect(l).to.be.equal(4)
    })
  })

  it('usoPipe contiene 4 palabras', () => {
    usoPipe.palabras((w) => {
      expect(w).to.be.equal(4)
    })
  })

  it('usoPipe tiene 34 caracteres.', () => {
    usoPipe.caracteres((c) => {
      expect(c).to.be.equal(34)
    })
  })

  it('usoPipe devuelve undefined si se selecciona un fichero que no existe.', () => {
    const usoPipe = new Pipe('ejemplo.txt')
    usoPipe.lineas((l) => {
      expect(l).to.be.equal(undefined)
    })
    usoPipe.palabras((w) => {
      expect(w).to.be.equal(undefined)
    })
    usoPipe.caracteres((c) => {
      expect(c).to.be.equal(undefined)
    })
  })

  const noUsoPipe = new NoPipe('.eslintignore')

  it('noUsoPipe es una instacia de NoPipe', () => {
    expect(noUsoPipe).to.be.an.instanceOf(NoPipe)
  })

  it('noUsoPipe está compuesto por 4 líneas.', () => {
    noUsoPipe.lineas((l) => {
      expect(l).to.be.equal(4)
    })
  })

  it('noUsoPipe está compuesto de 4 palabras.', () => {
    noUsoPipe.palabras((w) => {
      expect(w).to.be.equal(4)
    })
  })

  it('noUsoPipe está compuesto por 34 palabras', () => {
    noUsoPipe.caracteres((c) => {
      expect(c).to.be.equal(34)
    })
  })

  it('noUsoPipe debe devolver undefined en el caso de que no exista el fichero.', () => {
    const noUsoPipe = new NoPipe('file.txt')
    noUsoPipe.lineas((l) => {
      expect(l).to.be.equal(undefined)
    })
    noUsoPipe.palabras((w) => {
      expect(w).to.be.equal(undefined)
    })
    noUsoPipe.caracteres((c) => {
      expect(c).to.be.equal(undefined)
    })
  })
})

