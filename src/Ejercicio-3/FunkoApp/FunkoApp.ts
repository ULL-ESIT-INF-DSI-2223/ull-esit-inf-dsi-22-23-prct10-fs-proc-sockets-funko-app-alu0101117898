import * as fs from "fs";
import { Funko } from "../Funko/Funko.js";
import { FunkoTypes } from "../Funko/FunkoTypes.js";
import { FunkoGenres } from "../Funko/FunkoGenres.js";
import * as path from "path";
/**
 * Se desarrolla la clase App que representa la aplicación de los
 * FunkoPop. Esta clase contiene los métodos necesarios para
 * cargar los datos de los FunkoPop, guardar los datos, 
 * añadir un FunkoPop, modificar un FunkoPop, eliminar un FunkoPop
 * y buscar un FunkoPop.
 */
export class App {
  private user: string;
  private Funkos: Map<number, Funko> = new Map<number, Funko>();

  /**
   * Constructor de la clase App.
   * @param user - El usuario que va a almacenar los FunkoPop.
   */
  constructor(user: string) {
    this.user = user;
  }

  /**
   * El método `cargarDatos` carga los datos de los FunkoPop
   * del usuario que se le pasa por parámetro.
   * @param user - El usuario que va a almacenar los FunkoPop.
   * @returns Si se han cargado los datos correctamente.
   */
  public cargarDatos(user: string): boolean {
    const carpeta: string = "./data/" + user + "/";
    if (!fs.existsSync(carpeta)) {
      fs.mkdirSync("./data/" + user);
    }
    const archivos = fs.readdirSync(carpeta);

    if (archivos.length == 0) {
      return false;
    } else {
      archivos.forEach((archivo) => {
        const ruta: string = path.join(carpeta, archivo);
        const funko: Funko = JSON.parse(fs.readFileSync(ruta, "utf-8"));
        this.Funkos.set(funko.id, funko);
      });
    }
    return true;
  }

  /**
   * El metodo `guardarDatos` guarda los datos de los FunkoPop
   * del usuario que se le pasa por parámetro.
   * @returns Comprueba si el usuario tiene datos almacenados.
   */
  public guardarDatos(): boolean {
    this.Funkos.forEach((funko) => {
      if (!fs.existsSync("./data/" + this.user + "/" + funko.id + ".json")) {
        fs.writeFileSync(
          "./data/" + this.user + "/" + funko.id + ".json",
          JSON.stringify(funko)
        );
      }
    });
    return true;
  }

  /**
   * El método `getFunko` devuelve el FunkoPop que se le pasa por parámetro.
   * @param id Id del funko.
   * @returns 
   */
  public getFunko(id: number): Funko | undefined {
    return this.Funkos.get(id);
  }

  /**
   * El método `addFunko` añade un FunkoPop a la lista de FunkoPop.
   * @param user - El usuario que va a almacenar los FunkoPop.
   * @param id - Id del FunkoPop.
   * @param name - Nombre del FunkoPop.
   * @param description - Descripción del FunkoPop.
   * @param type - Tipo del FunkoPop.
   * @param genre - Género del FunkoPop.
   * @param Franquicia - Franquicia del FunkoPop.
   * @param Numero_franquicia - Número de la franquicia del FunkoPop.
   * @param exclusivo - Si es exclusivo o no.
   * 
   */
  public addFunko(
    user: string,
    id: number,
    name: string,
    description: string,
    type: FunkoTypes,
    genre: FunkoGenres,
    franquicia: string,
    franquiciaId: number,
    exclusivo: boolean,
    caracteristicas: string,
    precio: number
  ): boolean {
    if (!this.Funkos.has(id)) {
      const funko = new Funko(
        id,
        name,
        description,
        type,
        genre,
        franquicia,
        franquiciaId,
        exclusivo,
        caracteristicas,
        precio
      );
      const ruta: string = "./data/" + user + "/" + id + ".json";
      fs.writeFileSync(ruta, JSON.stringify(funko));
      return true;
    } else {
      return false;
    }
  }

  /**
   * funcion para modificar un funko
   * @param id id del funko
   * @param name nombre del funko
   * @param description descripcion del funko
   * @param type type del funko
   * @param Genero genero del funko
   * @param franquicia franquicia del funko
   * @param franquiciaId numero de la franquicia del funko
   * @param exclusivo exclusivo del funko
   * @param caracteristicas caracteristicas especiales del funko
   * @param precio precio del funko
   * @returns devuelve true si se ha modificado correctamente
   */
  public modifyFunko(
    id: number,
    name: string,
    description: string,
    type: FunkoTypes,
    Genero: FunkoGenres,
    franquicia: string,
    franquiciaId: number,
    exclusivo: boolean,
    caracteristicas: string,
    precio: number
  ): boolean {
    if (this.Funkos.has(id)) {
      const funko = new Funko(
        id,
        name,
        description,
        type,
        Genero,
        franquicia,
        franquiciaId,
        exclusivo,
        caracteristicas,
        precio
      );
      const ruta: string = "./data/" + this.user + "/" + id + ".json";
      fs.writeFileSync(ruta, JSON.stringify(funko));
      return true;
    } else {
      return false;
    }
  }

  /**
   * El método `removeFunko` elimina un FunkoPop de la lista de FunkoPop.
   * @param id id del funko.
   * @returns Si se ha eliminado correctamente.
   */
  public removeFunko(id: number): boolean {
    if (this.Funkos.has(id)) {
      fs.unlinkSync("./data/" + this.user + "/" + id + ".json");
      this.Funkos.delete(id);
      return true;
    }
    return false;
  }

  /**
   * El método `listFunkos` devuelve una lista con todos los FunkoPop del usuario.
   * @returns devuelve una lista con todos los funkos del usuario seleccionado.
   */
  public listFunkos(): Funko[] {
    const funkos: Funko[] = [];
    this.Funkos.forEach((funko) => {
      funkos.push(funko);
    });
    return funkos;
  }

  /**
   * El método `showFunkoById` devuelve un FunkoPop por su id.
   */
  public showFunkoById(id: number): Funko | undefined {
    if (this.Funkos.has(id)) {
      const funko = this.Funkos.get(id);
      if (funko !== undefined) {
        return this.Funkos.get(id);
      }
    }
    return undefined;
  }
}