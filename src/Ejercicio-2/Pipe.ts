import fs from 'fs'
import { spawn } from 'child_process'
import { Base } from './Base.js'

/**
 * Se desarrolla la clase `Pipe` que extiende de la clase `Base` y que
 * implementa los métodos `lineas`, `palabras` y `caracteres` de la clase
 * `Base`.
 * @extends Base
 * @implements lineas, palabras, caracteres
 * @see Base
 * @see lineas
 * @see palabras
 * @see caracteres
 * 
 */
export class Pipe extends Base {
  /**
   * El constructor de la clase `Pipe` recibe la ruta del archivo a leer.
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
    const wc = spawn('/usr/bin/wc', ['-l', this.ruta])
    let output = ''
    wc.stdout.on('data', (chunk) => {
      output += chunk.toString()
    })
    wc.on('exit', () => {
      callback(parseInt(output.split(' ')[0]) + 1)
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
    const wc = spawn('/usr/bin/wc', ['-w', this.ruta])
    let output = ''
    wc.stdout.on('data', (chunk) => {
      output += chunk.toString()
    })
    wc.on('exit', () => {
      callback(parseInt(output.split(' ')[0]))
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
    const wc = spawn('/usr/bin/wc', ['-m', this.ruta])
    let output = ''
    wc.stdout.on('data', (chunk) => {
      output += chunk.toString()
    })
    wc.on('exit', () => {
      callback(parseInt(output.split(' ')[0]))
    })
  }
}