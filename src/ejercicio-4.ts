import * as fs from 'fs';
import {spawn} from 'child_process';
import yargs = require('yargs');

function comandoUno(ruta: string) {
  if (!fs.existsSync(`${ruta}`)) {
    console.log(`\n¡ERROR! No existe el directorio o el fichero ${ruta} indicado en el parámetro --ruta\n`);
    return;
  }

  const ls = spawn('ls', ['-ld', `${ruta}`]);

  let lsOutput = '';
  ls.stdout.on('data', (piece) => lsOutput += piece);

  ls.on('close', () => {
    const lsOutputAsArray = lsOutput.split(/\s+/);
    if (lsOutputAsArray[0][0] == "d") {
      console.log(`\nLa ruta "${ruta}" es un directorio\n`);
    } else {
      console.log(`\nLa ruta "${ruta}" es un fichero\n`);
    }
  });
}

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


function comandoDos(ruta: string) {
  if (fs.existsSync(`${ruta}`)) {
    console.log(`\n¡ERROR! No se ha podido crear el directorio debido a que ya existe la ruta ${ruta}, indicada en el parámetro --ruta\n`);
    return;
  }

  let cont = ruta.length-1;
  while (ruta[cont] == "/") { // Le quitamos las / del final, debido a que el usuario puede haberlas introducido en el final de la ruta, y esto nos puede perjudicar posteriormente a la hora de revisar si la ruta en la que se quiere crear el directorio existe
    ruta = ruta.substring(0, cont);
    cont--;
  }

  const analizaRuta = ruta.split(/\//g);
  let aux = analizaRuta[0];

  for (let i = 1; i < analizaRuta.length-1; i++) {
    aux = aux+"/"+analizaRuta[i];
    if (!fs.existsSync(`${aux}`)) {
      console.log(`\n¡ERROR! No se puede crear el directorio debido a que no existe la ruta "${aux}", indicada en el parámetro --ruta\n`);
      return;
    }
  }

  const ls = spawn('mkdir', [`${ruta}`]);

  ls.on('close', () => {
    console.log(`\nDirectorio "${ruta}" creado\n`);
  });
}

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


function comandoTres(ruta: string) {
  if (!fs.existsSync(`${ruta}`)) {
    console.log(`\n¡ERROR! No existe el directorio ${ruta}, indicado en el parámetro --ruta\n`);
    return;
  }

  console.log();
  const ls = spawn('ls', [`${ruta}`]);
  ls.stdout.pipe(process.stdout);
}

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


function comandoCuatro(ruta: string) {
  if (!fs.existsSync(`${ruta}`)) {
    console.log(`\n¡ERROR! No existe el fichero ${ruta}, indicado en el parámetro --ruta\n`);
    return;
  }

  const ls = spawn('ls', ['-ld', `${ruta}`]);

  let lsOutput = '';
  ls.stdout.on('data', (piece) => lsOutput += piece);

  ls.on('close', () => {
    const lsOutputAsArray = lsOutput.split(/\s+/);
    if (lsOutputAsArray[0][0] == "d") {
      console.log(`\n¡ERROR! "${ruta}" es un directorio, indicado en el parámetro --ruta\n`);
    } else {
      const cat = spawn('cat', [`${ruta}`]);
      cat.stdout.pipe(process.stdout);
    }
  });
}

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


function comandoCinco(ruta: string) {
  if (!fs.existsSync(`${ruta}`)) {
    console.log(`\n¡ERROR! No existe el fichero ${ruta}, indicado en el parámetro --ruta\n`);
    return;
  }

  const rm = spawn('rm', ['-rf', `${ruta}`]);
  rm.stdout.pipe(process.stdout);
}

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


function comandoSeis(rutaOrigen: string, rutaDestino: string) {
  if (!fs.existsSync(`${rutaOrigen}`)) {
    console.log(`\n¡ERROR! No existe el fichero ${rutaOrigen}, indicado en el parámetro --rutaOrigen\n`);
    return;
  }

  let cont = rutaDestino.length-1;
  while (rutaDestino[cont] == "/") { // Le quitamos las / del final, debido a que el usuario puede haberlas introducido en el final de la ruta, y esto nos puede perjudicar posteriormente a la hora de revisar si la ruta en la que se quiere crear el directorio existe
    rutaDestino = rutaDestino.substring(0, cont);
    cont--;
  }

  const analizaRuta = rutaDestino.split(/\//g);
  let aux = analizaRuta[0];

  for (let i = 1; i < analizaRuta.length-1; i++) {
    aux = aux+"/"+analizaRuta[i];
    if (!fs.existsSync(`${aux}`)) {
      console.log(`\n¡ERROR! No se puede copiar debido a que no existe la ruta "${aux}", indicada en el parámetro --rutaDestino\n`);
      return;
    }
  }

  const cp = spawn('cp', ['-r', `${rutaOrigen}`, `${rutaDestino}`]);
  cp.stdout.pipe(process.stdout);

  console.log("\nFichero copiado correctamente\n");
}

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
