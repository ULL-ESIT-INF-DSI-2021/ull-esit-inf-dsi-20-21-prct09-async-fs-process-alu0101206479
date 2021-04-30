import * as fs from 'fs';
import yargs = require('yargs');

/**
 * ```typescript
 * // Ejemplo de llamada
 *  aplicacion("alu0101206479", "src/ejercicio-3/usuarios");
 * ```
 * Función que controla los cambios realizados sobre todo el directorio especificado al mismo tiempo que dicho usuario interactúa con la aplicación de procesamiento de notas.
 * @param usuario Usurario de la aplicación de notas al que queremos controlarle el directorio
 * @param ruta Ruta dónde se almacenan los directorios de los usuarios
 */
function aplicacion(usuario: string, ruta: string) {
  let directorioUsuario = `${ruta}${usuario}`;
  if (ruta[ruta.length-1] != "/") {
    directorioUsuario = `${ruta}/${usuario}`;
  }
  fs.access(directorioUsuario, (err) => {
    if (err) {
      console.log(`\n¡ERROR! No existe el directorio "${directorioUsuario}"\n`);
    } else {
      fs.open(ruta, fs.constants.O_DIRECTORY, (err) => {
        if (err) {
          console.log(`\n¡ERROR! La ruta ${directorioUsuario} es un fichero\n`);
        } else {
          fs.readdir(directorioUsuario, (err, filesUno) => {
            if (err) {
              console.log(`¡ERROR! No se ha podido leer el contenido del directorio ${directorioUsuario}`);
            } else {
              // Las dos variables siguientes las usamos porque cuando se añade una nota se emite un evento rename y un evento change, y en cada uno de estos se debe mostrar un mensaje, pero yo solo quiero que se muestre el mensaje "Se ha añadido" y no "Se ha modificado", por lo tanto a través de estas variables compruebo q se alla llamado al rename antes del change y por lo tanto no mostaría "Se ha modificado", sin embargo si una nota se ha modificado porque hemos ejecutado modify si se mostraría dicho mensaje
              let notaAñadidaAntes = false;
              let notaModificada = true;
              // La siguiente variable se usa porque cuando se modifica un fichero con modify, se produce dos veces el evento change, y yo en cada evento emito un mensaje, por lo que con esta variable hago que en vez de mostrar dos "Se ha modificado" muestro nada más uno
              let numeroVecesChange = 0;
              fs.watch(directorioUsuario, (evento, fichero) => {
                if (notaAñadidaAntes == false) {
                  notaModificada = true;
                }
                if (numeroVecesChange == 2) {
                  numeroVecesChange = 0;
                }
                fs.readdir(directorioUsuario, (err, filesDos) => {
                  if (err) {
                    console.log(`¡ERROR! No se ha podido leer el contenido del directorio ${directorioUsuario} después de que pasará algo con este`);
                  } else {
                    if (evento == "rename") {
                      if (filesUno.length < filesDos.length) {
                        console.log(`\nSe ha añadido la nota "${fichero}"\n`);
                        notaAñadidaAntes = true;
                      }
                      if (filesUno.length > filesDos.length) {
                        console.log(`\nSe ha borrado la nota "${fichero}"\n`);
                      }

                      filesUno = filesDos;
                    }
                    if (evento == "change") {
                      if (notaAñadidaAntes == true) {
                        notaModificada = false;
                        notaAñadidaAntes = false;
                        numeroVecesChange = -1;
                      }
                      if (notaModificada == true && numeroVecesChange < 1) {
                        console.log(`\nSe ha modificado la nota "${fichero}"\n`);
                      }
                      numeroVecesChange++;
                    }
                  }
                });
              });
            }
          });
        }
      });
    }
  });
}


/**
 * Comando para llamar a la función de encima (Vígila el directorio del usuario que le pasemos indicandole la ruta donde se almacena el directorio de este usuario)
 */
yargs.command( {
  command: 'watch',
  describe: 'La terminal se queda congelada esperando a un cambio en el directorio del usuario',
  builder: {
    usuario: {
      describe: 'Nombre de usuario del usuario',
      demandOption: true,
      type: 'string',
    },
    ruta: {
      describe: 'Ruta donde se almacena el directorio del usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === "string" && typeof argv.ruta === "string") {
      aplicacion(argv.usuario, argv.ruta);
    }
  },
});


yargs.argv;
