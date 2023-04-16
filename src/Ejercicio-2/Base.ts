/**
 * Se desarrolla la clase abstracta `Base` que contiene los métodos abstractos
 * `lineas`, `palabras` y `caracteres` que serán implementados por las clases
 * `Pipe` y `NoPipe`.
 */
export abstract class Base {

  /**
   * Se define el constructor de la clase con la ruta del archivo a leer.
   * @param ruta Ruta del archivo a leer.
   */
  public constructor(protected ruta: string) {}

  /**
   * Se define el método abstracto `lineas` que recibe un callback que
   * recibe como parámetro un número o `undefined`.
   */
  public abstract lineas: (callback: (data: number | undefined) => void) => void

  /**
   * Se define el método abstracto `palabras` que recibe un callback que
   * recibe como parámetro un número o `undefined`.
   */
  public abstract palabras: (callback: (data: number | undefined) => void) => void

  /**
   * Se define el método abstracto `caracteres` que recibe un callback que
   * recibe como parámetro un número o `undefined`.
   */
  public abstract caracteres: (callback: (data: number | undefined) => void) => void
}