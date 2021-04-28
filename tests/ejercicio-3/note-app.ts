import {Usuario} from './usuario';
import * as yargs from 'yargs';

/**
 * Comando add, sirve para añadir nuevas notas a un usuario
 */
yargs.command( {
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.añadirNota(argv.title, argv.body, argv.color);
    }
  },
});

/**
 * Comando modify, sirve para modificar una nota concreta de un usuario
 */
yargs.command( {
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newTitle: {
      describe: 'New note title',
      demandOption: false,
      type: 'string',
    },
    newBody: {
      describe: 'New note title',
      demandOption: false,
      type: 'string',
    },
    newColor: {
      describe: 'New note title',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const usuario = new Usuario(argv.user);
      if (typeof argv.newBody === 'string') {
        usuario.modificarNota(argv.title, "cuerpo", argv.newBody);
      }
      if (typeof argv.newColor === 'string') {
        usuario.modificarNota(argv.title, "color", argv.newColor);
      }
      if (typeof argv.newTitle === 'string') {
        usuario.modificarNota(argv.title, "titulo", argv.newTitle);
      }
    }
  },
});

/**
 * Comando remove, sirve para borrar una nota concreta de un usuario
 */
yargs.command( {
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.borrarNota(argv.title);
    }
  },
});

/**
 * Comando list, sirve para listar las notas de un usuario
 */
yargs.command( {
  command: 'list',
  describe: 'List notes of a concrect user',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.listarNotas();
    }
  },
});

/**
 * Comando read, sirve para leer una nota concreta de un usuario
 */
yargs.command( {
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const usuario = new Usuario(argv.user);
      usuario.leerNota(argv.title);
    }
  },
});

yargs.argv;
