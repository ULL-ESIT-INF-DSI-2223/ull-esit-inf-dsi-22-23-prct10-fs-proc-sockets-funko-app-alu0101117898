import "mocha";
import { expect } from "chai";
import { App } from "../../src/Ejercicio-3/FunkoApp/FunkoApp.js";
import * as fs from "fs";
import { FunkoGenres } from "../../src/Ejercicio-3/Funko/FunkoGenres.js";
import { FunkoTypes } from "../../src/Ejercicio-3/Funko/FunkoTypes.js";

describe("FunkoApp", () => {
  it("Deberia cargar los datos.", () => {
    fs.rmSync("./data/user", { recursive: true, force: true });
    const funkoApp = new App("user");
    let funciona = funkoApp.cargarDatos("user");
    funkoApp.addFunko(
      "user",
      1,
      "Guts",
      "El caballero negro.",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "Berserk",
      1,
      true,
      "Figura del combate contra el Dios del Mar.",
      50
    );
    funkoApp.guardarDatos();
    expect(funciona).to.be.equal(false);
    funkoApp.guardarDatos();
  });
  it("Carga los datos del funko.", () => {
    const funkoApp = new App("user");
    let funciona = funkoApp.cargarDatos("user");
    expect(funciona).to.be.equal(true);
  });
  it("Almacena los datos del usuario.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let funciona = funkoApp.guardarDatos();
    expect(funciona).to.be.equal(true);
  });
  it("Añade un funko al usuario.", () => {
    const funkoApp = new App("user");
    let added = funkoApp.addFunko(
      "user",
      2,
      "Griffith",
      "Lider de la Banda del Alcón",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "Berserk",
      1,
      true,
      "En el futuro, formará parte de la Mano de Dios.",
      40
    );
    expect(added).to.be.equal(true);
  });
  it("No añade al funko.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let added = funkoApp.addFunko(
      "user",
      1,
      "nombre",
      "desc",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "franq",
      1,
      true,
      "car_e",
      1
    );
    expect(added).to.be.equal(false);
  });
  it("Modifica uno de los funkos.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let modified = funkoApp.modifyFunko(
      1,
      "nombre2",
      "desc2",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "franq2",
      2,
      false,
      "car_e2",
      2
    );
    expect(modified).to.be.equal(true);
  });
  it("No modifica al funko, ya que no existe.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let modified = funkoApp.modifyFunko(
      3,
      "nombre2",
      "desc2",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "franq2",
      2,
      false,
      "car_e2",
      2
    );
    expect(modified).to.be.equal(false);
  });
  it("Obtiene la información del funko.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    const funko = funkoApp.getFunko(1);
    expect(funko?.id).to.be.equal(1);
  });
  it("Muestra los funkos de un usuario.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    const funkos = funkoApp.listFunkos();
    let fun = false;
    if (funkos != null) {
      fun = true;
    }
    expect(fun).to.be.equal(true);
  });
  it("Muestra los funkos por su Id", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    funkoApp.addFunko(
      "user",
      2,
      "nombre",
      "desc",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "franq",
      1,
      true,
      "car_e",
      10
    );
    funkoApp.addFunko(
      "user",
      3,
      "nombre",
      "desc",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "franq",
      1,
      true,
      "car_e",
      60
    );
    funkoApp.addFunko(
      "user",
      4,
      "nombre",
      "desc",
      FunkoTypes.POP,
      FunkoGenres.ANIME,
      "franq",
      1,
      true,
      "car_e",
      30
    );
    funkoApp.cargarDatos("user");
    const funko = funkoApp.showFunkoById(1) ? true : false;
    const funko2 = funkoApp.showFunkoById(2) ? true : false;
    const funko3 = funkoApp.showFunkoById(3) ? true : false;
    const funko4 = funkoApp.showFunkoById(4) ? true : false;
    expect(funko).to.be.equal(true);
    expect(funko2).to.be.equal(true);
    expect(funko3).to.be.equal(true);
    expect(funko4).to.be.equal(true);
  });
  it("No muestra un funko que no existe.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    const funko = funkoApp.showFunkoById(7) ? true : false;
    expect(funko).to.be.equal(false);
  });
  it("Elimina a un funko.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let removed = funkoApp.removeFunko(1);
    expect(removed).to.be.equal(true);
  });
  it("No consigue eliminar a un funko que no existe.", () => {
    const funkoApp = new App("user");
    funkoApp.cargarDatos("user");
    let removed = funkoApp.removeFunko(7) ? true : false;
    expect(removed).to.be.equal(false);
  });
});