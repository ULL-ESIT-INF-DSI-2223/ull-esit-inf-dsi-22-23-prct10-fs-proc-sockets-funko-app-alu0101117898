import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoGenres } from "../Funko/FunkoGenres.js";
import { FunkoTypes } from "../Funko/FunkoTypes.js";
import chalk from "chalk";
import { Funko } from "../Funko/Funko.js";
import * as net from "net";

/**
 * Se define el tipo de mensaje que se envía al servidor
 * y el tipo de mensaje que se recibe del servidor.
 */
export type RequestType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  funkoPop?: Funko;
  id?: number;
};

/**
 * Se define el tipo de mensaje que se envía al servidor
 * y el tipo de mensaje que se recibe del servidor.
 * Se añade el campo success para indicar si la operación
 * se ha realizado con éxito o no.
 */
export type ResponseType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  success: boolean;
  funkoPop?: Funko;
  funkolist?: Funko[];
};

/**
 * Se crea el cliente que se conectará al servidor.
 * Se define el puerto y la dirección del servidor.
 * Se realiza la llamada a la `función createConnection` del modulo `net`
 * para crear la conexión con el servidor.
 */
const client = net.createConnection({ port: 60300 }, () => {
  console.log("Connected to server!");
  if (process.argv[2] == "add") {
    yargs(hideBin(process.argv))
      /**
       * Se define el comando "add" que se ejecuta cuando se introduce
       * el comando "add" en la terminal.
       * Se define el parámetro "user" que se introduce con el comando "add".
       * Se define el parámetro "id" que se introduce con el comando "add".
       * Se define el parámetro "nombre" que se introduce con el comando "add".
       * Se define el parámetro "desc" que se introduce con el comando "add".
       * Se define el parámetro "tipo" que se introduce con el comando "add".
       * Se define el parámetro "genero" que se introduce con el comando "add".
       * Se define el parámetro "franq" que se introduce con el comando "add".
       * Se define el parámetro "franqId" que se introduce con el comando "add".
       * Se define el parámetro "exclusivo" que se introduce con el comando "add".
       * Se define el parámetro "caracteristicas" que se introduce con el comando "add".
       * Se define el parámetro "precio" que se introduce con el comando "add".
       */
      .command(
        "add",
        "Adds a funko",
        {
          user: {
            description: "Nombre del usuario.",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Id del funko.",
            type: "number",
            demandOption: true,
          },
          nombre: {
            description: "Nombre del funko.",
            type: "string",
            demandOption: true,
          },
          desc: {
            description: "Funko description",
            type: "string",
            demandOption: true,
          },
          tipo: {
            description: "Tipo de funko",
            type: "string",
            demandOption: true,
          },
          genero: {
            description: "Género del funko.",
            type: "string",
            demandOption: true,
          },
          franq: {
            description: "Funko franchise",
            type: "string",
            demandOption: true,
          },
          num_f: {
            description: "Franquicia del funko.",
            type: "number",
            demandOption: true,
          },
          exclusivo: {
            description: "Si el funko es exclusivo.",
            type: "boolean",
            demandOption: true,
          },
          carac: {
            description: "Características especiales del funko.",
            type: "string",
            demandOption: true,
          },
          precio: {
            description: "Funko price",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          /**
           * Se crea el objeto FunkoPop que se enviará al servidor.
           * Se crea el objeto request que se enviará al servidor.
           * Se envía el objeto request al servidor.  
           */
          const FunkoPop: Funko = {
            id: argv.id,
            name: argv.nombre,
            description: argv.desc,
            type: argv.tipo as FunkoTypes,
            genre: argv.genero as FunkoGenres,
            franquicia: argv.franq,
            franquiciaId: argv.num_f,
            exclusivo: argv.exclusivo,
            caracteristicas: argv.carac,
            precio: argv.precio,
          };

          const request: RequestType = {
            type: "add",
            user: argv.user,
            funkoPop: FunkoPop,
          };
          
          /**
           * Se envía el objeto request al servidor.
           * Se muestra por consola el mensaje enviado al servidor.
           */
          client.write(JSON.stringify(request));
          console.log("Mensaje add enviado al servidor.");

          /**
           * Se recibe la respuesta del servidor.
           * Se muestra por consola el mensaje recibido del servidor.
           * Se muestra por consola si el funko se ha añadido correctamente o no.
           */
          client.on("data", (dataJson) => {
            const data = JSON.parse(dataJson.toString());
            if (data.success === true) {
              console.log(chalk.green("Funko añadido correctamente"));
            } else {
              console.log(chalk.red("Funko no añadido"));
            }
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "list") {
    yargs(hideBin(process.argv))
      /**
       * Se define el comando "list" que se ejecuta cuando se introduce
       * el comando "list" en la terminal.
       * Se define el parámetro "user" que se introduce con el comando "list".
       * Se envía el objeto request al servidor.
       */
      .command(
        "list",
        "Shows all the funkos of a user",
        {
          user: {
            description: "Nombre del usuario.",
            type: "string",
            demandOption: true,
          },
        },
        (argv) => {
          const request: RequestType = {
            type: "list",
            user: argv.user,
          };

          /**
           * Se envía el objeto request al servidor.
           * Se muestra por consola el mensaje enviado al servidor.
           */
          client.write(JSON.stringify(request));
          console.log("Meensaje list enviado al servidor.");

          /**
           * Se recibe la respuesta del servidor.
           * Se muestra por consola el mensaje recibido del servidor.
           * Se muestra por consola los datos de los funkos del usuario.
           */
          client.on("data", (dataJson) => {
            const data = JSON.parse(dataJson.toString());
            const Funkos: Funko[] = data.funkolist;
            console.log(chalk.green("Funkos de " + argv.user));
            console.log(chalk.green("------------------"));
            Funkos.forEach((funko) => {
              let color = chalk.green;
              if (funko.precio <= 10) {
                color = chalk.green;
              } else if (funko.precio > 10 && funko.precio <= 20) {
                color = chalk.yellow;
              } else if (funko.precio > 20 && funko.precio <= 50) {
                color = chalk.red;
              } else {
                color = chalk.blue;
              }
              console.log(color("ID: " + funko.id));
              console.log(color("Nombre: " + funko.name));
              console.log(color("Descripción: " + funko.description));
              console.log(color("Tipo: " + funko.type));
              console.log(color("Genero: " + funko.genre));
              console.log(color("Franquicia: " + funko.franquicia));
              console.log(
                color("Numero de franquicia: " + funko.franquiciaId)
              );
              console.log(color("Exclusivo: " + funko.exclusivo));
              console.log(
                color(
                  "Caracteristicas especiales: " +
                    funko.caracteristicas
                )
              );
              console.log(color("precio: " + funko.precio));
              console.log(color("------------------"));
            });
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "update") {
    yargs(hideBin(process.argv))
      /**
       * Se define el comando "update" que se ejecuta cuando se introduce
       * el comando "update" en la terminal.
       * Se define el parámetro "user" que se introduce con el comando "update".
       * Se define el parámetro "id" que se introduce con el comando "update".
       * Se define el parámetro "nombre" que se introduce con el comando "update".
       * Se define el parámetro "desc" que se introduce con el comando "update".
       * Se define el parámetro "tipo" que se introduce con el comando "update".
       * Se define el parámetro "genero" que se introduce con el comando "update".
       * Se define el parámetro "franq" que se introduce con el comando "update".
       * Se define el parámetro "num_f" que se introduce con el comando "update".
       * Se define el parámetro "exclusivo" que se introduce con el comando "update".
       * Se define el parámetro "carac" que se introduce con el comando "update".
       * Se define el parámetro "precio" que se introduce con el comando "update".
       */
      .command(
        "update",
        "Updates a funko",
        {
          user: {
            description: "Nombre del usuario.",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Id del funko.",
            type: "number",
            demandOption: true,
          },
          nombre: {
            description: "Nombre del funko.",
            type: "string",
            demandOption: true,
          },
          desc: {
            description: "Descripcción del funko.",
            type: "string",
            demandOption: true,
          },
          tipo: {
            description: "Tipo de funko",
            type: "string",
            demandOption: true,
          },
          genero: {
            description: "Género del funko.",
            type: "string",
            demandOption: true,
          },
          franq: {
            description: "Funko franchise",
            type: "string",
            demandOption: true,
          },
          num_f: {
            description: "Franquicia del funko.",
            type: "number",
            demandOption: true,
          },
          exclusivo: {
            description: "Si el funko es exclusivo.",
            type: "boolean",
            demandOption: true,
          },
          carac: {
            description: "Características especiales del funko.",
            type: "string",
            demandOption: true,
          },
          precio: {
            description: "Funko price",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {

          /**
           * 
           */
          const FunkoPop: Funko = {
            id: argv.id,
            name: argv.nombre,
            description: argv.desc,
            type: argv.tipo as FunkoTypes,
            genre: argv.genero as FunkoGenres,
            franquicia: argv.franq,
            franquiciaId: argv.num_f,
            exclusivo: argv.exclusivo,
            caracteristicas: argv.carac,
            precio: argv.precio,
          };

          const request: RequestType = {
            type: "update",
            user: argv.user,
            funkoPop: FunkoPop,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje update enviado");

          client.on("data", (dataJson) => {
            const data = JSON.parse(dataJson.toString());
            if (data.success) {
              console.log(chalk.green("Funko actualizado"));
            } else {
              console.log(chalk.red("Funko no actualizado"));
            }
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "read") {
    yargs(hideBin(process.argv))
      .command(
        "read",
        "Shows a funko given an ID",
        {
          user: {
            description: "Nombre del usuario.",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Id del funko.",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          const request: RequestType = {
            type: "read",
            user: argv.user,
            id: argv.id,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje read enviado");

          client.on("data", (dataJson) => {
            const data = JSON.parse(dataJson.toString());
            if (data.success) {
              const funko = data.funkoPop;
              const color = chalk.green;
              console.log(color("ID: " + funko.id));
              console.log(color("Nombre: " + funko.name));
              console.log(color("Descripcion: " + funko.description));
              console.log(color("Tipo: " + funko.Tipo));
              console.log(color("Genero: " + funko.Genero));
              console.log(color("Franquicia: " + funko.Franquicia));
              console.log(
                color("Numero de franquicia: " + funko.Numero_franquicia)
              );
              console.log(color("Exclusivo: " + funko.Exclusivo));
              console.log(
                color(
                  "Caracteristicas especiales: " +
                    funko.Caracteristicas_especiales
                )
              );
              console.log(color("precio: " + funko.precio));
              console.log(color("------------------"));
            } else {
              console.log(chalk.red("Funko no encontrado"));
            }
          });
        }
      )
      .help().argv;
  } else if (process.argv[2] === "remove") {
    yargs(hideBin(process.argv))
      .command(
        "remove",
        "Removes a funko given an ID",
        {
          user: {
            description: "Nombre del usuario.",
            type: "string",
            demandOption: true,
          },
          id: {
            description: "Id del funko.",
            type: "number",
            demandOption: true,
          },
        },
        (argv) => {
          const request: RequestType = {
            type: "remove",
            user: argv.user,
            id: argv.id,
          };

          client.write(JSON.stringify(request));
          console.log("mensaje remove enviado");

          client.on("data", (dataJson) => {
            const data = JSON.parse(dataJson.toString());
            if (data.success) {
              console.log(chalk.green("Funko eliminado"));
            } else {
              console.log(chalk.red("Funko no eliminado"));
            }
          });
        }
      )
      .help().argv;
  }
});