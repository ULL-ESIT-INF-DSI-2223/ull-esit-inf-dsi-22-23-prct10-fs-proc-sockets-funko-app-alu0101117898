import { FunkoGenres } from "./FunkoGenres.js";
import { FunkoTypes } from "./FunkoTypes.js";
import { InterfaceFunkoPop } from "./InterfaceFunko.js";

/**
 * Clase Funko
 */
export class Funko implements InterfaceFunkoPop {
/**
 * La interfaz `InterfaceFunkoPop` define la estructura de un Funko Pop.
 * @property id - El identificador del Funko. `readonly` para que no se pueda modificar.
 * @property name - El nombre del Funko.
 * @property description - La descripción del Funko.
 * @property type - El tipo de Funko.
 * @property genre - El género del Funko.
 * @property franquicia - La franquicia del Funko Pop.
 * @property franquiciaId - El identificador de la franquicia del Funko Pop.
 * @property exclusivo - Si el Funko Pop es exclusivo o no.
 * @property caracteristicas - Las características especiales del Funko Pop.
 * @property precio - El precio del Funko Pop.
 */
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public type: FunkoTypes,
    public genre: FunkoGenres,
    public franquicia: string,
    public franquiciaId: number,
    public exclusivo: boolean,
    public caracteristicas: string,
    public precio: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.genre = genre;
    this.franquicia = franquicia;
    this.franquiciaId = franquiciaId;
    this.exclusivo = exclusivo;
    this.caracteristicas = caracteristicas;
    this.precio = precio;
  }
}