import { FunkoTypes } from "./FunkoTypes.js";
import { FunkoGenres } from "./FunkoGenres.js";

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
export interface InterfaceFunkoPop {
  id: number;
  name: string;
  description: string;
  type: FunkoTypes;
  genre: FunkoGenres;
  franquicia: string;
  franquiciaId: number;
  exclusivo: boolean;
  caracteristicas: string;
  precio: number;
}