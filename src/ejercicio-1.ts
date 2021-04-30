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


/**
 * TRAZA DE LO QUE SE EJECUTA EN ESTE FICHERO
 *
 *   Inicio, TODO VACÍO
 *
 *   | Pila de llamadas |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |------------------|           |---------------------|           |---------------------|           |--------|
 *   |------------------|           |---------------------|           |---------------------|           |--------|
 *
 *   Primer paso: SE INTRODUCE EL SCRIPT MAIN EN LA PILA DE LLAMADS
 *
 *   | Pila de llamadas |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |------------------|           |---------------------|           |---------------------|           |--------|
 *   |      main        |           |---------------------|           |---------------------|           |--------|
 *   |------------------|
 *
 *   Segundo paso: SE INTRODUCE ACCESS EN LA PILA DE LLAMADAS
 *
 *   | Pila de llamadas |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |------------------|           |---------------------|           |---------------------|           |--------|
 *   |     access       |           |---------------------|           |---------------------|           |--------|
 *   |      main        |
 *   |------------------|
 *
 *   Tercer paso: ACCESS PASA AL REGISTRO DE EVENTOS
 *
 *   | Pila de llamadas |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |------------------|           |---------------------|           |---------------------|           |--------|
 *   |      main        |           |       access        |           |---------------------|           |--------|
 *   |------------------|           |---------------------|
 *
 *   Cuarto paso: SALE MAIN DE LA PILA DE LLAMADAS, SE INTRODUCE EL MANEJADOR DE ACCESS EN LA COLA DE MANEJADORES Y SE SALE ACCESS DEL RESGISTRO DE EVENTOS
 *
 *   | Pila de llamadas |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |------------------|           |---------------------|           |---------------------|           |--------|
 *   |------------------|           |---------------------|           | manejador de access |           |--------|
 *                                                                    |---------------------|
 *
 *   Quinto paso: COMO NO HAY MAS MANEJADORES Y LA PILA DE LLAMADAS ESTA VACÍA, EL MANEJADOR DE ACCESS PASA A LA PILA DE LLAMADAS
 *
 *   |   Pila de llamadas  |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |---------------------|           |---------------------|           |---------------------|           |--------|
 *   | manejador de access |           |---------------------|           |---------------------|           |--------|
 *   |---------------------|
 *
 *   Sexto paso: EMPEZAMOS A EJECUTAR EL MANEJADOR Y ENTRA EN LA PILA DE LLAMADAS console.log(`Starting to watch file ${filename}`)
 *
 *   |                 Pila de llamadas                  |           | Registro de eventos |           | Cola de manejadores |           | Salida |
 *   |---------------------------------------------------|           |---------------------|           |---------------------|           |--------|
 *   | console.log(`Starting to watch file ${filename}`) |           |---------------------|           |---------------------|           |--------|
 *   |                manejador de access                |
 *   |---------------------------------------------------|
 *
 *   Séptimo paso: SE EJECUTA EL console.log(`Starting to watch file ${filename}`) Y PASA LA SALIDA A LA TABLA DE SALIDA
 *
 *   |   Pila de llamadas  |           | Registro de eventos |           | Cola de manejadores |           |                 Salida                |
 *   |---------------------|           |---------------------|           |---------------------|           |---------------------------------------|
 *   | manejador de access |           |---------------------|           |---------------------|           | Starting to watch file helloworld.txt |
 *   |---------------------|                                                                               |---------------------------------------|
 *
 *   Octavo paso: SE INTRODUCE LA FUNCION watch(process.argv[2]) EN LA PILA DE LLAMADAS
 *
 *   |     Pila de llamadas   |           | Registro de eventos |           | Cola de manejadores |           |                 Salida                |
 *   |------------------------|           |---------------------|           |---------------------|           |---------------------------------------|
 *   | watch(process.argv[2]) |           |---------------------|           |---------------------|           | Starting to watch file helloworld.txt |
 *   |   manejador de access  |                                                                               |---------------------------------------|
 *   |------------------------|
 *
 *   Noveno paso: SE EJECUTA LA FUNCION watch(process.argv[2]) Y SALE DE LA PILA DE LLAMADAS
 *
 *   |   Pila de llamadas  |           | Registro de eventos |           | Cola de manejadores |           |                 Salida                |
 *   |---------------------|           |---------------------|           |---------------------|           |---------------------------------------|
 *   | manejador de access |           |---------------------|           |---------------------|           | Starting to watch file helloworld.txt |
 *   |---------------------|                                                                               |---------------------------------------|
 *
 *   Décimo paso: SE INTRODUCE LA FUNCION watcher.on('change') EN LA PILA DE LLAMADAS
 *
 *   |   Pila de llamadas   |           | Registro de eventos |           | Cola de manejadores |           |                 Salida                |
 *   |----------------------|           |---------------------|           |---------------------|           |---------------------------------------|
 *   | watcher.on('change') |           |---------------------|           |---------------------|           | Starting to watch file helloworld.txt |
 *   | manejador de access  |                                                                               |---------------------------------------|
 *   |----------------------|
 *
 *   Undécimo paso: watcher.on('change') PASA AL REGISTRO DE EVENTOS
 *
 *   |   Pila de llamadas  |           | Registro de eventos  |           | Cola de manejadores |           |                 Salida                |
 *   |---------------------|           |----------------------|           |---------------------|           |---------------------------------------|
 *   | manejador de access |           | watcher.on('change') |           |---------------------|           | Starting to watch file helloworld.txt |
 *   |---------------------|           |----------------------|                                             |---------------------------------------|
 *
 *   Decimo-segundo paso: COMO LA FUNCIÓN watcher.on('change') SE QUEDA ESPERANDO A QUE SE EDITE EL FICHERO, EL PROGRAMA SIGUE SU FLUJO DE EJECUCIÓN, POR LO QUE SE INTRODUCE console.log(`File ${filename} is no longer watched`) EN LA PILA DE LLAMADAS
 *
 *   |                   Pila de llamadas                   |           | Registro de eventos  |           | Cola de manejadores |           |                 Salida                |
 *   |------------------------------------------------------|           |----------------------|           |---------------------|           |---------------------------------------|
 *   | console.log(`File ${filename} is no longer watched`) |           | watcher.on('change') |           |---------------------|           | Starting to watch file helloworld.txt |
 *   |                 manejador de access                  |           |----------------------|                                             |---------------------------------------|
 *   |------------------------------------------------------|
 *
 *   Decimo-tercer paso: SE EJECUTA EL console.log(`File ${filename} is no longer watched`) Y PASA LA SALIDA A LA TABLA DE SALIDA
 *
 *   |   Pila de llamadas  |           | Registro de eventos  |           | Cola de manejadores |           |                   Salida                 |
 *   |---------------------|           |----------------------|           |---------------------|           |------------------------------------------|
 *   | manejador de access |           | watcher.on('change') |           |---------------------|           |   Starting to watch file helloworld.txt  |
 *   |---------------------|           |----------------------|                                             | File helloworld.txt is no longer watched |
 *                                                                                                          |------------------------------------------|
 *
 *   Decimo-cuarto paso: AHORA, SALE EL MANEJADOR DE ACCESS DE LA PILA DE LLAMADAS Y COMO YA NO HAY NADA MÁS PARA EJECUTAR POR EL FLUJO NORMAL DEL PROGRAMA, EL PROGRAMA SE QUEDA ESPERANDO A QUE HAYA CAMBIOS EN EL FICHERO PARA QUE SE ACTIVE EL EVENTO watcher.on('change'), ASI QUE AHORA EDITAREMOS EL FICHERO POR PRIMERA VEZ Y LO GUARDAREMOS, POR LO QUE EN ESE MOMENTO, PASARÁ EL MANEJADOR DE DICHO EVENTO A LA COLA DE MANEJADORES Y EL EVENTO NO SALDRÁ DEL REGISTRO DE EVENTOS DEBIDO A QUE SIGUE ACTIVO MIENTRAS EL PROGRAMA SIGA ACTIVO
 *
 *   | Pila de llamadas |           | Registro de eventos  |           |                    Cola de manejadores                    |           |                   Salida                 |
 *   |------------------|           |----------------------|           |-----------------------------------------------------------|           |------------------------------------------|
 *   |------------------|           | watcher.on('change') |           | console.log(`File ${filename} has been modified somehow`) |           |   Starting to watch file helloworld.txt  |
 *                                  |----------------------|           |-----------------------------------------------------------|           | File helloworld.txt is no longer watched |
 *                                                                                                                                             |------------------------------------------|
 *
 *   Decimo-quinto paso: COMO NO HAY MAS MANEJADORES, EL MANEJADOR DE WATCHER.ON PASA A LA PILA DE LLAMADAS Y SE EMPIEZA A EJECUTAR
 *
 *   |                      Pila de llamadas                     |           | Registro de eventos  |           | Cola de manejadores |           |                   Salida                 |
 *   |-----------------------------------------------------------|           |----------------------|           |---------------------|           |------------------------------------------|
 *   | console.log(`File ${filename} has been modified somehow`) |           | watcher.on('change') |           |---------------------|           |   Starting to watch file helloworld.txt  |
 *   |              manejador de watcher-on(change)              |           |----------------------|                                             | File helloworld.txt is no longer watched |
 *   |-----------------------------------------------------------|                                                                                |------------------------------------------|
 *
 *   Decimo-sexto paso: SE EJECUTA EL MANEJADOR DEL WATCHER.ON, SALE DE LA COLA DE LLAMADAS Y AL SER UN CONSOLE.LOG SE INTRODUCE LA SALIDA EN LA TABLA DE SALIDA
 *
 *   | Pila de llamadas |           | Registro de eventos  |           | Cola de manejadores |           |                    Salida                     |
 *   |------------------|           |----------------------|           |---------------------|           |-----------------------------------------------|
 *   |------------------|           | watcher.on('change') |           |---------------------|           |    Starting to watch file helloworld.txt      |
 *                                  |----------------------|                                             |   File helloworld.txt is no longer watched    |
 *                                                                                                       | File helloworld.txt has been modified somehow |
 *                                                                                                       |-----------------------------------------------|
 *
 *   Decimo-séptimo paso: EDITAMOS EL FICHERO POR SEGUNDA VEZ Y GUARDAMOS, POR LO QUE SE VUELVE A ACTIVAR EL EVENTO WATCHER.ON Y SU MANEJADOR PASA A LA COLA DE MANEJADORES
 *
 *   | Pila de llamadas |           | Registro de eventos  |           |      Cola de manejadores        |           |                    Salida                     |
 *   |------------------|           |----------------------|           |---------------------------------|           |-----------------------------------------------|
 *   |------------------|           | watcher.on('change') |           | manejador de watcher-on(change) |           |    Starting to watch file helloworld.txt      |
 *                                  |----------------------|           |---------------------------------|           |   File helloworld.txt is no longer watched    |
 *                                                                                                                   | File helloworld.txt has been modified somehow |
 *                                                                                                                   |-----------------------------------------------|
 *
 *   Décimo-octavo paso: COMO NO HAY MAS MANEJADORES, EL MANEJADOR DE WATCHER.ON PASA A LA PILA DE LLAMADAS Y SE EMPIEZA A EJECUTAR
 *
 *   |                      Pila de llamadas                     |           | Registro de eventos  |           | Cola de manejadores |           |                    Salida                     |
 *   |-----------------------------------------------------------|           |----------------------|           |---------------------|           |-----------------------------------------------|
 *   | console.log(`File ${filename} has been modified somehow`) |           | watcher.on('change') |           |---------------------|           |    Starting to watch file helloworld.txt      |
 *   |              manejador de watcher-on(change)              |           |----------------------|                                             |   File helloworld.txt is no longer watched    |
 *   |-----------------------------------------------------------|                                                                                | File helloworld.txt has been modified somehow |
 *                                                                                                                                                |-----------------------------------------------|
 *
 *   Decimo-noveno paso: SE EJECUTA EL MANEJADOR DEL WATCHER.ON, SALE DE LA COLA DE LLAMADAS Y AL SER UN CONSOLE.LOG SE INTRODUCE LA SALIDA EN LA TABLA DE SALIDA
 *
 *   | Pila de llamadas |           | Registro de eventos  |           | Cola de manejadores |           |                    Salida                     |
 *   |------------------|           |----------------------|           |---------------------|           |-----------------------------------------------|
 *   |------------------|           | watcher.on('change') |           |---------------------|           |    Starting to watch file helloworld.txt      |
 *                                  |----------------------|                                             |   File helloworld.txt is no longer watched    |
 *                                                                                                       | File helloworld.txt has been modified somehow |
 *                                                                                                       | File helloworld.txt has been modified somehow |
 *                                                                                                       |-----------------------------------------------|
 *
 *   Vigésimo paso: AHORA CERRAREMOS EL PROGRAMA Y SALDRÁ DEL REGISTRO DE EVENTOS WATCHER.ON
 *
 *   | Pila de llamadas |           | Registro de eventos |           | Cola de manejadores |           |                    Salida                     |
 *   |------------------|           |---------------------|           |---------------------|           |-----------------------------------------------|
 *   |------------------|           |---------------------|           |---------------------|           |    Starting to watch file helloworld.txt      |
 *                                                                                                      |   File helloworld.txt is no longer watched    |
 *                                                                                                      | File helloworld.txt has been modified somehow |
 *                                                                                                      | File helloworld.txt has been modified somehow |
 *                                                                                                      |-----------------------------------------------|
 *
 */
