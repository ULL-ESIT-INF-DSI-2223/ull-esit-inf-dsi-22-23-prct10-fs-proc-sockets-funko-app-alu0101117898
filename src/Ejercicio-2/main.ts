import { hideBin } from 'yargs/helpers'
import {access, constants} from 'fs';
import { Pipe } from './Pipe.js'
import { NoPipe } from './NoPipe.js'
import yargs from 'yargs'
import chalk from 'chalk';

/**
 * A través del uso de la librería `yargs` se desarrolla un programa que
 * permite obtener información de un fichero. El programa recibe como
 * parámetros el nombre del fichero, si se usa o no el pipe y si se quiere
 * obtener el número de líneas, palabras o caracteres del fichero.
 */
yargs(hideBin(process.argv))
.command(
  'file', 
  'Muestra la información seleccionada sobre el fichero.', 
  {
    fichero: {
      description: 'Ficxhero del que se quiere obtener información.',
      type: 'string',
      demandOption: true
    },
    usopipe: {
      description: 'Indica si se usa o no el pipe.',
      type: 'boolean',
      demandOption: true
    },
    lineas: {
      description: 'Obtiene el número de líneas del fichero.',
      type: 'boolean',
      demandOption: false
    },
    palabras: {
      description: 'Obtiene el número de palabras del fichero.',
      type: 'boolean',
      demandOption: false
    },
    caracteres: {
      description: 'Obtiene el número de caracteres del fichero.',
      type: 'boolean',
      demandOption: false
    }
}, (argv) => {
  /**
   * Si el comando introducido no es `file`, se muestra un mensaje de error
   * y se termina la ejecución del programa.
   */
  if(argv._[0] !== 'file') {
    console.log(chalk.red('Error, ha introducido un comando no reconocido.'));
    console.log(argv._[0]);
  } else {
  /**
   * Si se usa el pipe, se crea un objeto de la clase `Pipe` y se llama al
   * método correspondiente al parámetro que se haya introducido.
   * En el caso de que se vayan seleccionando las diferentes opciones, se
   * llamarán a los métodos correspondientes a cada una de ellas para mostrar
   * la información del fichero.
   */
    access(argv.fichero, constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.red(`No existe el archivo ${argv.fichero}`));
      } else {
        if (argv.usopipe == true) {
          const pipe = new Pipe(argv.fichero)
          if (argv.lineas == true) {
            pipe.lineas((data) => {
              console.log(chalk.green(`El fichero ${argv.fichero} tiene ${data} líneas.`))
            })
          }
          if (argv.palabras == true) {
            pipe.palabras((data) => {
              console.log(chalk.green(`El fichero ${argv.fichero} tiene ${data} palabras.`))
            })
          }
          if (argv.caracteres == true) {
            pipe.caracteres((data) => {
              console.log(chalk.green(`El fichero ${argv.fichero} tiene ${data} caracteres.`))
            })
          }
        }
      }
    })
  /**
   * Si no se usa el pipe, se crea un objeto de la clase `NoPipe` y se llama al
   * método correspondiente al parámetro que se haya introducido.
   * En el caso de que se vayan seleccionando las diferentes opciones, se
   * llamarán a los métodos correspondientes a cada una de ellas para mostrar
   * la información del fichero.
   */
    access(argv.fichero, constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.red(`No existe el archivo ${argv.fichero}`));
      } else {
        if (argv.usopipe == false) {
          const pipe = new NoPipe(argv.fichero)
          if (argv.lineas == true) {
            pipe.lineas((data) => {
              console.log(chalk.green(`El fichero ${argv.fichero} tiene ${data} líneas.`))
              console.log(argv._[0]);
            })
          }
          if (argv.palabras == true) {
            pipe.palabras((data) => {
              console.log(chalk.green(`El fichero ${argv.fichero} tiene ${data} palabras.`))
            })
          }
          if (argv.caracteres == true) {
            pipe.caracteres((data) => {
              console.log(chalk.green(`El fichero ${argv.fichero} tiene ${data} caracteres.`))
            })
          }
        }
      }
    })
  }
})
.help()
.argv;
