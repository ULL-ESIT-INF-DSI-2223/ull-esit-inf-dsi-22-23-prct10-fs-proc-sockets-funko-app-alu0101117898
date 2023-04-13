import chalk from "chalk";
import fs from "fs";
import path from "path";
/**
 * Clase que contiene los métodos para contar lineas, palabras y caracteres de un fichero
 */
export class NoPipe {
    /**
     * Constructor de la clase
     */
    constructor() {
        // console.log('NoPipe');
    }
    /**
     * metodo que cuenta las lineas de un fichero
     * @param ruta ruta del fichero
     * @returns mensaje con el numero de lineas
     */
    contarLineas(ruta) {
        const filePath = path.resolve(ruta);
        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath, 'utf-8');
            const lineas = file.split('\n');
            const cantidad = lineas.length;
            console.log(`El fichero ${ruta} tiene ${cantidad} lineas`);
            return `El fichero ${ruta} tiene ${cantidad} lineas`;
        }
        else {
            console.log(`El fichero ${ruta} no existe`);
            return `El fichero ${ruta} no existe`;
        }
    }
    /**
     * metodo que cuenta las palabras de un fichero
     * @param ruta  ruta del fichero
     * @returns mensaje con el numero de palabras
     */
    contarPalabras(ruta) {
        const filePath = path.resolve(ruta);
        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath, "utf-8");
            const palabras = file.split(/\s+/);
            const cantidad = palabras.length;
            console.log(chalk.green.bold(`El fichero ${ruta} tiene ${cantidad} palabras`));
            return `El fichero ${ruta} tiene ${cantidad} palabras`;
        }
        else {
            console.log(chalk.red.bold(`El fichero ${ruta} no existe`));
            return `El fichero ${ruta} no existe`;
        }
    }
    /**
     * metodo que cuenta los caracteres de un fichero
     * @param ruta ruta del fichero
     * @returns mensaje con el numero de caracteres
     */
    contarCaracteres(ruta) {
        const filePath = path.resolve(ruta);
        if (fs.existsSync(filePath)) {
            //console.log(chalk.green.bold(`El fichero ${filename} existe`));
            const file = fs.readFileSync(filePath, "utf-8");
            const caracteres = file.split("");
            const cantidad = caracteres.length;
            console.log(chalk.green.bold(`El fichero ${ruta} tiene ${cantidad} caracteres`));
            return `El fichero ${ruta} tiene ${cantidad} caracteres`;
        }
        else {
            console.log(chalk.red.bold(`El fichero ${ruta} no existe`));
            return `El fichero ${ruta} no existe`;
        }
    }
    /**
     * metodo que cuenta todo de un fichero
     * @param fichero nombre del fichero
     * @returns mensaje con el numero de lineas, palabras y caracteres
     */
    contarTodo(fichero) {
        let resultado = '';
        if (!fs.existsSync(fichero)) {
            console.log(chalk.red.bold(`El fichero ${fichero} no existe`));
            return `El fichero ${fichero} no existe`;
        }
        resultado += this.contarLineas(fichero) + '\n';
        resultado += this.contarPalabras(fichero) + '\n';
        resultado += this.contarCaracteres(fichero);
        return resultado;
    }
}
