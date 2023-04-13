import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk, { ChalkInstance } from "chalk";
import fs from "fs";
import { NoPipe } from "./Nopipe.js";





yargs(hideBin(process.argv))

.command(
  "lineas",
  "Mostrar la cantidad de lineas de un fichero",
  {
    fichero: {
      description: "Fichero a leer",
      type: "string",
      demandOption: true,
    },
  },
  (argv) => {
    new NoPipe().contarLineas(argv.fichero);
  }
)
.command(
  "palabras",
  "Mostrar la cantidad de palabras de un fichero",
  {
    fichero: {
      description: "Fichero a leer",
      type: "string",
      demandOption: true,
    },
  },
  (argv) => {
    new NoPipe().contarPalabras(argv.fichero);
  }
)
.command(
  "caracteres",
  "Mostrar la cantidad de caracteres de un fichero",
  {
    fichero: {
      description: "Fichero a leer",
      type: "string",
      demandOption: true,
    },
  },
  (argv) => {
    new NoPipe().contarCaracteres(argv.fichero);
  }
)
.command(
  "Todo",
  "Mostrar los tres comandos anteriores",
  {
    fichero: {
      description: "Fichero a leer",
      type: "string",
      demandOption: true,
    },
  },
  (argv) => {
    new NoPipe().contarLineas(argv.fichero);
    new NoPipe().contarPalabras(argv.fichero);
    new NoPipe().contarCaracteres(argv.fichero);
  }
)
.help().argv;
