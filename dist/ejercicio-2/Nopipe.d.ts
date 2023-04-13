/**
 * Clase que contiene los métodos para contar lineas, palabras y caracteres de un fichero
 */
export declare class NoPipe {
    /**
     * Constructor de la clase
     */
    constructor();
    /**
     * metodo que cuenta las lineas de un fichero
     * @param ruta ruta del fichero
     * @returns mensaje con el numero de lineas
     */
    contarLineas(ruta: string): string;
    /**
     * metodo que cuenta las palabras de un fichero
     * @param ruta  ruta del fichero
     * @returns mensaje con el numero de palabras
     */
    contarPalabras(ruta: string): string;
    /**
     * metodo que cuenta los caracteres de un fichero
     * @param ruta ruta del fichero
     * @returns mensaje con el numero de caracteres
     */
    contarCaracteres(ruta: string): string;
    /**
     * metodo que cuenta todo de un fichero
     * @param fichero nombre del fichero
     * @returns mensaje con el numero de lineas, palabras y caracteres
     */
    contarTodo(fichero: string): string;
}
