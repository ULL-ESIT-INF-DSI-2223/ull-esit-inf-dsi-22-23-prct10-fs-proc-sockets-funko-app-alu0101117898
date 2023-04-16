# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js - Ricardo Fariña Mesa

## Introducción

En esta práctica se va a trabajar con el módulo `fs` de `Node.js` para la gestión de ficheros, creación de procesos y creación de sockets. 
- Se va a trabajar con el lenguaje de programación `TypeScript` y se va a utilizar el entorno de desarrollo `Visual Studio Code`. 
- Se utilizará el módulo `net` para la creación de sockets, creando conexiones entre cliente y servidor. 
- Se utilizará el módulo `child_process` para la creación de procesos. 
## Desarrollo

### Ejercicio 1

En este primer ejercicio, se verá el siguiente código fuente TypeScript que hace uso del módulo `fs` de `Node.js`:

```Typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
  Se guarda el contenido en `src/ejercicio1.ts` como `test.ts` y se crea el archivo de texto `helloworld.txt` para que se tenga un archivo al que observar. A través de la compilación con el uso de `tsc` se genera en la carpeta ``/dist` el archivo `test.js` que se ejecuta con el comando `node dist/test.js helloworld.txt` y se obtiene el siguiente resultado:

```bash
  Starting to watch file helloworld.txt
  File helloworld.txt has been modified somehow
```

En el caso de que se modifique el archivo `helloworld.txt` se obtiene el siguiente resultado:

```bash
File helloworld.txt has been modified somehow
File helloworld.txt has been modified somehow
```
Se añaden estas líneas, comprobando de que el archivo que se observa se está modificando.
A nivel de traza de ejecucución, el programa se ejecuta de la siguiente manera:

  - Se comprueba que el número de argumentos sea 3, ya que el primero será el comando de ejecución(`node`), el segundo el programa a ejecutar(`test.js`) y el tercero el archivo a observar(`helloworld.txt`). En el caso de que no se cumpla la condición, se muestra un mensaje de error.

  - Se almacena el nombre del archivo a observar en la variable `filename`.

  - Se llama a la función `access` del módulo `fs` pasándole como parámetros el nombre del archivo a observar, la constante `F_OK` que indica que se quiere comprobar que el archivo existe. Al llamar a la función `access` se añade una nueva entrada a la pila de llamadas.

  - En el caso de que el archivo no exista, se muestra un mensaje de error y se elimina la entrada de la pila de llamadas.

  - En el caso de que el archivo exista, se muestra un mensaje de inicio de observación del archivo, se llama a la función `watch` del módulo `fs` pasándole como parámetro el nombre del archivo a observar. Al llamar a la función `watch` se añade una nueva entrada a la pila de llamadas.

  - Cuando se modifica el archivo `helloworld.txt`, se detecta el cambio en el archivo y se añade un nuevo evento `change` a la cola de manejadores que se ejecuta cuando se vacía la pila de llamadas.  

  - Una vez se ha ejecutado el programa, se muestra por consola el mensaje `File helloworld.txt is no longer watched`, y se elimina la entrada de la pila de llamadas.

### Ejercicio 2

  En este segundo ejercicio se ha desarrollado un programa que permite obtener a través del uso la terminal el número de líneas, palabras o caracteres que componen al fichero que seleccionemos. Para ello se ha realizado dos programas diferentes para implementarlo:

  - Haciendo uso del método `Pipe` de un Stream para poder redirigir la salida de un comando hacia otro.
  - Sin hacer uso del método `Pipe`, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.

  Primero se ha desarrollado la clase abstracta `Base` que contiene los métodos y atributos comunes a las clases `Pipe` y `NoPipe`:
  ```Typescript
export abstract class Base {

  public constructor(protected ruta: string) {}
  public abstract lineas: (callback: (data: number | undefined) => void) => void
  public abstract palabras: (callback: (data: number | undefined) => void) => void
  public abstract caracteres: (callback: (data: number | undefined) => void) => void

}
```

  Esta clase abstracta se ha desarrollado en las dos diferentes clases, donde una utiliza el método `Pipe` y la otra no. En el caso de la clase `Pipe` se ha desarrollado de la siguiente manera:

```Typescript
import fs from 'fs'
import { spawn } from 'child_process'
import { Base } from './Base.js'

export class Pipe extends Base {
  /**
   * El constructor de la clase `Pipe` recibe la ruta del archivo a leer.
   * @param ruta Ruta del archivo a leer.
   */
  public constructor(protected ruta: string) {
    super(ruta)
  }

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

```
  
En el caso de la clase `NoPipe` se ha desarrollado de la siguiente manera:
  
```Typescript
import fs, { createReadStream } from 'fs'
import { Base } from './Base.js'

export class NoPipe extends Base {

  public constructor(protected ruta: string) {
    super(ruta)
  }

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
```

  Por último, se ha desarrollado una clase `main` que contiene el código necesario para ejecutar el programa. En este caso, se ha desarrollado de la siguiente manera:

```Typescript
import { hideBin } from 'yargs/helpers'
import {access, constants} from 'fs';
import { Pipe } from './Pipe.js'
import { NoPipe } from './NoPipe.js'
import yargs from 'yargs'

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

  if(argv._[0] !== 'file') {
    console.log('Error, ha introducido un comando no reconocido.');
  } else {

    access(argv.fichero, constants.F_OK, (err) => {
      if (err) {
        console.log(`No existe el archivo ${argv.fichero}`);
      } else {
        if (argv.usopipe == true) {
          const pipe = new Pipe(argv.fichero)
          if (argv.lineas == true) {
            pipe.lineas((data) => {
              console.log(`El fichero ${argv.fichero} tiene ${data} líneas.`)
            })
          }
          if (argv.palabras == true) {
            pipe.palabras((data) => {
              console.log(`El fichero ${argv.fichero} tiene ${data} palabras.`)
            })
          }
          if (argv.caracteres == true) {
            pipe.caracteres((data) => {
              console.log(`El fichero ${argv.fichero} tiene ${data} caracteres.`)
            })
          }
        }
      }
    })

    access(argv.fichero, constants.F_OK, (err) => {
      if (err) {
        console.log(`No existe el archivo ${argv.fichero}`);
      } else {
        if (argv.usopipe == false) {
          const pipe = new NoPipe(argv.fichero)
          if (argv.lineas == true) {
            pipe.lineas((data) => {
              console.log(`El fichero ${argv.fichero} tiene ${data} líneas.`)
            })
          }
          if (argv.palabras == true) {
            pipe.palabras((data) => {
              console.log(`El fichero ${argv.fichero} tiene ${data} palabras.`)
            })
          }
          if (argv.caracteres == true) {
            pipe.caracteres((data) => {
              console.log(`El fichero ${argv.fichero} tiene ${data} caracteres.`)
            })
          }
        }
      }
    })
  }
})
.help()
.argv;
```

  En el código anterior, se ha utilizado la librería `yargs` para poder utilizar los argumentos de entrada. En este caso, se ha utilizado el comando `file` para poder obtener la información del fichero. Además, se ha utilizado el comando `usopipe` para poder indicar si se quiere utilizar el pipe o no. Por último, se ha utilizado el comando `lineas`, `palabras` y `caracteres` para poder obtener la información del fichero, los cuales son opcionales. En el caso de que un usuario no introduzca ningún comando, se le mostrará un mensaje de error. Además, se ha utilizado el comando `help` para poder mostrar la ayuda del programa. A su vez, se comprueba si el fichero existe o no, en caso de que no exista, se le mostrará un mensaje de error al usuario.

  La ejecución del programa se realiza de la siguiente manera:
  ```
  node main.js file --fichero "Ruta_del_fichero" --usopipe "true or false" [--lineas] [--palabras] [--caracteres]
  ```

### Ejercicio 3 - Cliente y servidor para aplicación de registro de Funko Pops

  Como último ejercicio, se utilizará el código de la práctica anterior de la asignatura sobre el registro de Funko Pops, solo que se ha modificado para mejorar el código y evitar sus errores anteriores y poder realizar una conexión cliente/servidor.

### Ejercicio PE103

  Para la modificación realizada en clase, se ha solicitado que se realice un código cliente/servidor. En este caso, el cliente se conecta con el servidor y envía un comando. El servidor, al recibirlo, ejecuta dicho comando bash y devuelve la salida al cliente. El cliente, al recibir la salida, la muestra por pantalla.

#### Cliente
  ```Typescript
import net from 'net';
import { program } from 'commander';

program
  .arguments('<command> [arguments...]')
  .description('Envía un comando al servidor')
  .action((args) => {
    const client = net.connect({ port: 60300 });


    client.on('data', data => {
      console.log(data.toString().trim());
      client.end();
    });

    client.on('end', () => {
      console.log(`Connected to server. Sending command: ${args}`);
      console.log('Muestra mensaje');
      client.write(`${args.join(' ')}`);
      console.log('Disconnected from server.');
    });
  });

program.parse(process.argv);
  ```

#### Servidor
  ```Typescript
import net from 'net';
import { exec } from 'child_process';

const server = net.createServer(connection => {

  console.log('Client connected.');

  connection.on('data', data => {
    const [command, ...args] = data.toString().trim().split(' ');
    console.log(`Received command: ${command} ${args}`);

    exec(`${command} ${args.join(' ')}`, (error, stdout, stderr) => {
      const output = error ? stderr : stdout;
      connection.write(output);
    });
  });

  connection.on('close', () => {
    console.log('Client disconnected.');
  });
});

const PORT = 60300;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

  ```

## Tests

  Se han realizado una serie de tests para comprobar el correcto funcionamiento de los ejercicios realizados. Para ello se han utilizado los módulos `mocha` y `chai`. A su vez, se ha añadido el módulo `c8` para poder realizar el coverage de los tests, ya que `coveralls` no tiene soporte en `Node.js`. Al ejecutar los tests, se obtiene el siguiente resultado:

```
[~/practica-10-mod/dist/Ejercicio-3/FunkoApp(main)]$npm run coverage

> prct10@1.0.0 coverage
> c8 npm test && c8 report --reporter=lcov


> prct10@1.0.0 test
> mocha

(node:43561) ExperimentalWarning: Custom ESM Loaders is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)


  --Ejercicio 2 pruebas--
    ✔ usoPipe debe ser una instancia de Pipe.
    ✔ usoPipe está compuesto de 4 líneas.
    ✔ usoPipe contiene 4 palabras
    ✔ usoPipe tiene 34 caracteres.
    ✔ usoPipe devuelve undefined si se selecciona un fichero que no existe.
    ✔ noUsoPipe es una instacia de NoPipe
    ✔ noUsoPipe está compuesto por 4 líneas.
    ✔ noUsoPipe está compuesto de 4 palabras.
    ✔ noUsoPipe está compuesto por 34 palabras
    ✔ noUsoPipe debe devolver undefined en el caso de que no exista el fichero.

  FunkoApp
    ✔ Deberia cargar los datos.
    ✔ Carga los datos del funko.
    ✔ Almacena los datos del usuario.
    ✔ Añade un funko al usuario.
    ✔ No añade al funko.
    ✔ Modifica uno de los funkos.
    ✔ No modifica 
    ✔ should get a funko
    ✔ should list funkos
    ✔ should read a funko by id
    ✔ should not read a funko by id
    ✔ should delete a funko
    ✔ should not delete a funko


  23 passing (128ms)

----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   98.96 |    98.24 |     100 |   98.96 |                   
 Ejercicio-2          |     100 |      100 |     100 |     100 |                   
  Base.ts             |     100 |      100 |     100 |     100 |                   
  NoPipe.ts           |     100 |      100 |     100 |     100 |                   
  Pipe.ts             |     100 |      100 |     100 |     100 |                   
 Ejercicio-3/Funko    |     100 |      100 |     100 |     100 |                   
  Funko.ts            |     100 |      100 |     100 |     100 |                   
  FunkoGenres.ts      |     100 |      100 |     100 |     100 |                   
  FunkoTypes.ts       |     100 |      100 |     100 |     100 |                   
 Ejercicio-3/FunkoApp |   97.59 |    95.65 |     100 |   97.59 |                   
  FunkoApp.ts         |   97.59 |    95.65 |     100 |   97.59 | 58-62             
----------------------|---------|----------|---------|---------|-------------------
```
## Conclusiones

  A través del desarrollo de los diferentes ejercicios, se ha llegado a la conclusión de lo necesario y útil que es el uso de los sistemas cliente/servidor tanto para la conexión entre diferentes programas como para la conexión entre diferentes dispositivos. Además, se ha podido comprobar la importancia de la modularización del código, ya que permite que el código sea más legible y fácil de mantener. También estos aspectos ayudan a que el código sea más fácil de testear, ya que se pueden realizar tests unitarios de cada módulo y así comprobar que cada uno de ellos funciona correctamente.

## Bibliografía

  - [Node.js](https://nodejs.org/es/)
  - [Express](https://expressjs.com/es/)
  - [Socket.io](https://socket.io/)
  - [Mocha](https://mochajs.org/)
  - [Chai](https://www.chaijs.com/)