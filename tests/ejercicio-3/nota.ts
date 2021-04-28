/**
 * ```typescript
 * // Ejemplo de creación
 *  const nota = new Nota("Red note", "This is a red note", "red");
 * ```
 * Clase que representa a las notas
 */
export class Nota {
  /**
   * ```typescript
   * // Ejemplo de llamada
   *  const nota = new Nota("Red note", "This is a red note", "red");
   * ```
   * Constructor simplificado de la clase Nota
   * @param titulo Título de la nota
   * @param cuerpo Cuerpo de la nota
   * @param color Color de la nota
   */
  constructor(private titulo: string, private cuerpo: string, private color: string) {}

  /**
   * ```typescript
   * // Ejemplo de llamada
   *  usuario.getTitulo();
   * ```
   * Función que retorna el titulo de la nota
   * @return El atributo titulo
   */
  getTitulo() {
    return this.titulo;
  }

  /**
   * ```typescript
   * // Ejemplo de llamada
   *  usuario.setTitulo("Blue note");
   * ```
   * Función para cambiar el título de la nota
   * @param titulo Nuevo título que tendrá la nota
   */
  setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  /**
   * ```typescript
   * // Ejemplo de llamada
   *  usuario.getCuerpo();
   * ```
   * Función que retorna el cuerpo de la nota
   * @return El atributo cuerpo
   */
  getCuerpo() {
    return this.cuerpo;
  }

  /**
   * ```typescript
   * // Ejemplo de llamada
   *  usuario.setCuerpo("This is a blue note");
   * ```
   * Función para cambiar el cuerpo de la nota
   * @param cuerpo Nuevo cuerpo que tendrá la nota
   */
  setCuerpo(cuerpo: string) {
    this.cuerpo = cuerpo;
  }

  /**
   * ```typescript
   * // Ejemplo de llamada
   *  usuario.getColor();
   * ```
   * Función que retorna el color de la nota
   * @return El atributo color
   */
  getColor() {
    return this.color;
  }

  /**
   * ```typescript
   * // Ejemplo de llamada
   *  usuario.setColor("blue");
   * ```
   * Función para cambiar el color de la nota
   * @param color Nuevo color que tendrá la nota
   */
  setColor(color: string) {
    this.color = color;
  }
}
