import {spawn} from 'child_process';
import * as fs from 'fs';
import yargs = require('yargs');

// Función con pipe

function funcionConPipe(opciones: string[], fichero: string) {
  if (!fs.existsSync(`${fichero}`)) {
    console.log(`\n¡ERROR! El fichero ${fichero} indicado en el parámetro --fichero\n`);
    return;
  }

  const wc = spawn('wc', [`${fichero}`]);
  const echo = spawn('echo', [`\nFichero: ${fichero}\n`]);
  echo.stdout.pipe(process.stdout);

  let wcOutput = '';
  wc.stdout.on('data', (piece) => wcOutput += piece);

  wc.on('close', () => {
    const wcOutputAsArray = wcOutput.split(/\s+/);
    opciones.forEach((opcion) => {
      if (opcion == "lineas") {
        const echo = spawn('echo', [`Numero de líneas: ${parseInt(wcOutputAsArray[1])+1}\n`]);
        echo.stdout.pipe(process.stdout);
      }
      if (opcion == "palabras") {
        const echo = spawn('echo', [`Numero de palabras: ${wcOutputAsArray[2]}\n`]);
        echo.stdout.pipe(process.stdout);
      }
      if (opcion == "caracteres") {
        const echo = spawn('echo', [`Numero de caracteres: ${wcOutputAsArray[3]}\n`]);
        echo.stdout.pipe(process.stdout);
      }
    });
  });
}


// Función sin pipe

function funcionSinPipe(opciones: string[], fichero: string) {
  if (!fs.existsSync(`${fichero}`)) {
    console.log(`\n¡ERROR! El fichero ${fichero} indicado en el parámetro --fichero\n`);
    return;
  }

  const wc = spawn('wc', [`${fichero}`]);
  console.log(`\n${fichero}\n`);

  let wcOutput = '';
  wc.stdout.on('data', (piece) => wcOutput += piece);

  wc.on('close', () => {
    const wcOutputAsArray = wcOutput.split(/\s+/);
    opciones.forEach((opcion) => {
      if (opcion == "lineas") {
        console.log(`Numero de líneas: ${parseInt(wcOutputAsArray[1])+1}\n`);
      }
      if (opcion == "palabras") {
        console.log(`Número de palabras: ${wcOutputAsArray[2]}\n`);
      }
      if (opcion == "caracteres") {
        console.log(`Número de caracteres: ${wcOutputAsArray[3]}\n`);
      }
    });
  });
}


yargs.command( {
  command: 'wc',
  describe: 'Cuenta líneas, palabras o caracteres de un archivo',
  builder: {
    fichero: {
      describe: 'Fichero del que se quiere contar',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Si o no según quiera contar haciendo uso del método pipe o no',
      demandOption: true,
      type: 'string',
    },
    lineas: {
      describe: 'Se se introduce esta opción se contarán líneas',
      demandOption: false,
      type: 'boolean',
    },
    caracteres: {
      describe: 'Se se introduce esta opción se contarán caracteres',
      demandOption: false,
      type: 'boolean',
    },
    palabras: {
      describe: 'Se se introduce esta opción se contarán palabras',
      demandOption: false,
      type: 'boolean',
    },
  },
  handler(argv) {
    if (typeof argv.fichero === "string" && typeof argv.pipe === "string") {
      let entradaFuncion: string[] = [];
      if (argv.lineas == true) {
        entradaFuncion.push("lineas");
      }
      if (argv.palabras == true) {
        entradaFuncion.push("palabras");
      }
      if (argv.caracteres == true) {
        entradaFuncion.push("caracteres");
      }

      if (entradaFuncion.length == 0) {
        entradaFuncion = ["lineas", "palabras", "caracteres"];
      }

      if (argv.pipe == "Si" || argv.pipe == "si" || argv.pipe == "SI") {
        funcionConPipe(entradaFuncion, argv.fichero);
      } else {
        if (argv.pipe == "No" || argv.pipe == "no" || argv.pipe == "NO") {
          funcionSinPipe(entradaFuncion, argv.fichero);
        } else {
          console.log(`\n¡ERROR! La opción ${argv.pipe} no está contemplada para el parámetro --pipe, debe poner --pipe="Si" o --pipe="No"\n`);
        }
      }
    }
  },
});

yargs.argv;

