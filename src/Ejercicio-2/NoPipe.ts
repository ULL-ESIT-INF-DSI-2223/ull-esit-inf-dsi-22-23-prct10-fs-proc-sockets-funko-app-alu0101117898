import fs, { createReadStream } from 'fs'
import { Base } from './Base.js'

/**
 * Se desarrolla la clase `NoPipe` que extiende de la clase `Base` y que
 * implementa los métodos `lineas`, `palabras` y `caracteres` de la clase
 * `Base`.
 * @extends Base
 * @implements lineas, palabras, caracteres
 * @see Base
 * @see lineas
 * @see palabras
 * @see caracteres
 */
export class NoPipe extends Base {

  /**
   * El constructor de la clase `NoPipe` recibe la ruta del archivo a leer.
   * @param ruta Ruta del archivo a leer.
   */
  public constructor(protected ruta: string) {
    super(ruta)
  }

  /**
   * El método `lineas` recibe un callback que recibe como parámetro un número
   * o `undefined`. Si el archivo no existe, el callback recibe `undefined`.
   * Si el archivo existe, el callback recibe el número de líneas del archivo.
   * @param callback Callback que recibe como parámetro un número o `undefined`.
   */
  public lineas = (callback: (data: number | undefined) => void): void => {
    if (!fs.existsSync(this.ruta)) {
      callback(undefined)
      return
    }
    const readStream = fs.createReadStream(this.ruta, 'utf8')
    let lineas = 0
    readStream.on('data', (chunk) => {
      lineas += chunk.toString().split(/\r\n|\r|\n/).length 
    })
    readStream.on('end', () => {
      callback(lineas)
    })
  }

  /**
   * El método `palabras` recibe un callback que recibe como parámetro un número
   * o `undefined`. Si el archivo no existe, el callback recibe `undefined`.
   * Si el archivo existe, el callback recibe el número de palabras del archivo.
   * @param callback Callback que recibe como parámetro un número o `undefined`.
   */
  public palabras = (callback: (data: number | undefined) => void): void => {
    if (!fs.existsSync(this.ruta)) {
      callback(undefined)
      return
    }
    const readStream = fs.createReadStream(this.ruta, 'utf8')
    let palabras = 0
    readStream.on('data', (chunk) => {
      palabras += chunk.toString().replace(/\s+/g, '\n').split(/\n/).length 
    })
    readStream.on('end', () => {
      callback(palabras)
    })
  }

  /**
   * El método `caracteres` recibe un callback que recibe como parámetro un número
   * o `undefined`. Si el archivo no existe, el callback recibe `undefined`.
   * Si el archivo existe, el callback recibe el número de caracteres del archivo.
   * @param callback Callback que recibe como parámetro un número o `undefined`.
   */
  public caracteres = (callback: (data: number | undefined) => void): void => {
    if (!fs.existsSync(this.ruta)) {
      callback(undefined)
      return
    }
    const readStream = createReadStream(this.ruta, 'utf8')
    let caracteres = 0
    readStream.on('data', (chunk) => {
      caracteres += chunk.toString().length
    })
    readStream.on('end', () => {
      callback(caracteres)
    })
  }
}