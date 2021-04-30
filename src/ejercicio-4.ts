import * as fs from 'fs';
import {spawn} from 'child_process';
import yargs = require('yargs');

/**
 * ```typescript
 * // Ejemplo de llamada
 *  comandoUno("src");
 * ```
 * Función que dada una ruta concreta, muestra si es un directorio o un fichero
 * @param ruta Ruta a examinar
 */
function comandoUno(ruta: string) {
  fs.access(ruta, (err) => {
    if (err) {
      console.log(`\n¡ERROR! No existe el directorio o el fichero "${ruta}" indicado en el parámetro --ruta\n`);
    } else {
      fs.open(ruta, fs.constants.O_DIRECTORY, (err) => {
        if (err) {
          console.log(`\nLa ruta "${ruta}" es un fichero\n`);
        } else {
          console.log(`\nLa ruta "${ruta}" es un directorio\n`);
        }
      });
    }
  });
}

/**
 * Comando para llamar a la función del punto 1 del ejercicio 4 (Muestra si una ruta es un directorio o un fichero)
 */
yargs.command( {
  command: 'uno',
  describe: 'Dada una ruta concreta, muestra si es un directorio o un fichero.',
  builder: {
    ruta: {
      describe: 'Fichero o directorio que se quiere analizar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === "string") {
      comandoUno(argv.ruta);
    }
  },
});


/**
 * ```typescript
 * // Ejemplo de llamada
 *  comandoDos("src/ejercicio-5");
 * ```
 * Función que crea un nuevo directorio a partir de una ruta que recibe como parámetro
 * @param ruta Ruta donde se creará el directorio
 */
function comandoDos(ruta: string) {
  fs.access(ruta, (err) => {
    if (!err) {
      console.log(`\n¡ERROR! No se ha podido crear el directorio debido a que ya existe la ruta "${ruta}", indicada en el parámetro --ruta\n`);
    } else {
      fs.mkdir(ruta, (err) => {
        if (err) {
          console.log(`\n¡ERROR! Ha habido un problema al intentar crear el directorio, puede ser porque la ruta especificada en el parámetro --ruta no existe\n`);
        } else {
          console.log(`\nDirectorio "${ruta}" creado\n`);
        }
      });
    }
  });
}

/**
 * Comando para llamar a la función del punto 2 del ejercicio 4 (Crea un nuevo directorio a partir de una ruta que se pasa como parámetro)
 */
yargs.command( {
  command: 'dos',
  describe: 'Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.',
  builder: {
    ruta: {
      describe: 'A partir de la ruta que se introduzca se crea el directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === "string") {
      comandoDos(argv.ruta);
    }
  },
});


/**
 * ```typescript
 * // Ejemplo de llamada
 *  comandoTres("src");
 * ```
 * Función que lista los ficheros dentro de un directorio
 * @param ruta Directorio que se quiere listar
 */
function comandoTres(ruta: string) {
  fs.access(ruta, (err) => {
    if (err) {
      console.log(`\n¡ERROR! No existe el directorio "${ruta}", indicado en el parámetro --ruta\n`);
    } else {
      console.log();
      const ls = spawn('ls', [ruta]);
      ls.stdout.pipe(process.stdout);
    }
  });
}

/**
 * Comando para llamar a la función del punto 3 del ejercicio 4 (Lista los ficheros dentro de un directorio especificado por parámetro)
 */
yargs.command( {
  command: 'tres',
  describe: 'Listar los ficheros dentro de un directorio.',
  builder: {
    ruta: {
      describe: 'Directorio del que se quiere listar los ficheros',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === "string") {
      comandoTres(argv.ruta);
    }
  },
});


/**
 * ```typescript
 * // Ejemplo de llamada
 *  comandoCuatro("src/ejercicio-1.ts");
 * ```
 * Función que muestra el contenido de un fichero
 * @param ruta Fichero del que se quiere ver el contenido
 */
function comandoCuatro(ruta: string) {
  fs.access(ruta, (err) => {
    if (err) {
      console.log(`\n¡ERROR! No existe el fichero "${ruta}", indicado en el parámetro --ruta\n`);
    } else {
      fs.open(ruta, fs.constants.O_DIRECTORY, (err) => {
        if (err) {
          console.log();
          const cat = spawn('cat', [ruta]);
          cat.stdout.pipe(process.stdout);
        } else {
          console.log(`\n¡ERROR! La ruta "${ruta}", indicada en el parámetro --ruta es un directorio\n`);
        }
      });
    }
  });
}

/**
 * Comando para llamar a la función del punto 4 del ejercicio 4 (Muestra el contenido de un directorio especificado por parámetro)
 */
yargs.command( {
  command: 'cuatro',
  describe: 'Mostrar el contenido de un fichero (similar a ejecutar el comando cat)',
  builder: {
    ruta: {
      describe: 'Fichero del que se quiere mostrar el contenido',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === "string") {
      comandoCuatro(argv.ruta);
    }
  },
});


/**
 * ```typescript
 * // Ejemplo de llamada
 *  comandoCinco("src");
 * ```
 * Función que borra ficheros y directorios
 * @param ruta Fichero o directorio a borrar
 */
function comandoCinco(ruta: string) {
  fs.access(ruta, (err) => {
    if (err) {
      console.log(`\n¡ERROR! No existe el fichero "${ruta}", indicado en el parámetro --ruta\n`);
    } else {
      const rm = spawn('rm', ['-rf', ruta]);

      rm.on('close', (err) => {
        if (err) {
          console.log(`\nHa habido un error al intentar borrar "${ruta}"\n`);
        } else {
          console.log(`\n"${ruta}" eliminado correctemente\n`);
        }
      });
    }
  });
}

/**
 * Comando para llamar a la función del punto 5 del ejercicio 4 (Borra ficheros y directorios especificados por parámetros)
 */
yargs.command( {
  command: 'cinco',
  describe: 'Borrar ficheros y directorios',
  builder: {
    ruta: {
      describe: 'Fichero o directorio que se quiere borrar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === "string") {
      comandoCinco(argv.ruta);
    }
  },
});


/**
 * ```typescript
 * // Ejemplo de llamada
 *  comandoSeis("helloworld.txt", "src/ejercicio-3/helloworld.txt");
 * ```
 * Función que mueve y copia ficheros y/o directorios de una ruta a otra
 * @param rutaOrigen Ruta dónde se encuentra el fichero y/o directorio
 * @param rutaDestino Ruta donde se quiere copiar y mover el fichero y/o directorio
 */
function comandoSeis(rutaOrigen: string, rutaDestino: string) {
  fs.access(`${rutaOrigen}`, (err) => {
    if (err) {
      console.log(`\n¡ERROR! No existe el fichero ${rutaOrigen}, indicado en el parámetro --rutaOrigen\n`);
    } else {
      fs.copyFile(rutaOrigen, rutaDestino, (err) => {
        if (err) {
          console.log(`\n¡ERROR! Ha habido un fallo al intentar copiar el archivo "${rutaOrigen}" en "${rutaDestino}, puede ser porque la última ruta, indicada en el parámetro --rutaDestino, no existe o esta mal puesta\n`);
        } else {
          console.log(`\nFichero "${rutaOrigen}" copiado satisfactoriamente en "${rutaDestino}"\n`);
        }
      });
    }
  });
}

/**
 * Comando para llamar a la función del punto 6 del ejercicio 4 (Mueve y copia ficheros y/o directorios de una ruta a otra, las dos especificadas por parámetros)
 */
yargs.command( {
  command: 'seis',
  describe: 'Mueve y copia ficheros de una ruta a otra',
  builder: {
    rutaOrigen: {
      describe: 'Fichero o directorio que se quiere copiar',
      demandOption: true,
      type: 'string',
    },
    rutaDestino: {
      describe: 'Ruta a la que se quiere copiar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.rutaOrigen === "string" && typeof argv.rutaDestino === "string") {
      comandoSeis(argv.rutaOrigen, argv.rutaDestino);
    }
  },
});


yargs.argv;
