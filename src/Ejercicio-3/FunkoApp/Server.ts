import { App } from "./FunkoApp.js";
import { Funko } from "../Funko/Funko.js";
import * as net from "net";

/**
 * Se define el tipo de datos que se envía al servidor
 * @param type tipo de petición
 * @param user usuario
 * @param funkoPop objeto funko
 * @param id id del funko
 */
export type RequestType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  funkoPop?: Funko;
  id?: number;
};

/**
 * Se define el tipo de datos que se recibe del servidor
 * @param type tipo de petición
 * @param user usuario
 * @param success si la petición fue exitosa
 * @param funkoPop objeto funko
 */
export type ResponseType = {
  type: "add" | "update" | "remove" | "read" | "list";
  user: string;
  success: boolean;
  funkoPop?: Funko;
  funkolist?: Funko[];
};

/**
 * Se crea el servidor al que se conectará el cliente.
 * Se define el puerto y la dirección del servidor.
 * Se define el evento "connection" que se ejecuta cuando se conecta un cliente.
 * Se define el evento "data" que se ejecuta cuando se recibe información del cliente.
 * Se define el evento "end" que se ejecuta cuando se desconecta un cliente.
 */
const server = net.createServer((connection) => {
  console.log("Se ha conectado un cliente.");
  connection.on("data", (dataJson) => {
    const data = JSON.parse(dataJson.toString());
    /**
     * Se define el evento "add" que se ejecuta cuando se recibe una petición de tipo "add",
     * en el caso de que un cliente quiera añadir un funko a un usuario.
     */
    if (data.type == "add") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      const added = app.addFunko(
        data.user,
        data.funkoPop.id,
        data.funkoPop.name,
        data.funkoPop.description,
        data.funkoPop.type,
        data.funkoPop.genre,
        data.funkoPop.franquicia,
        data.funkoPop.franquiciaId,
        data.funkoPop.exclusivo,
        data.funkoPop.caracteristicas,
        data.funkoPop.precio
      );
      /**
       * Se guarda los datos en el fichero JSON.
       * Se define la respuesta que se enviará al cliente.
       */
      app.guardarDatos();
      if (added) {
        const response: ResponseType = {
          type: "add",
          user: data.user,
          success: true,
        };
        connection.write(JSON.stringify(response));
      } else {
        const response: ResponseType = {
          type: "add",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }

    /**
     * Se define el evento "list" que se ejecuta cuando se recibe una petición de tipo "list",
     * en el caso de que un cliente quiera listar los funkos de un usuario.
     * Se define la respuesta que se enviará al cliente.
     * Se cierra la conexión.
     */
    if (data.type == "list") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      const list = app.listFunkos();
      const response: ResponseType = {
        type: "list",
        user: data.user,
        success: true,
        funkolist: list,
      };
      connection.write(JSON.stringify(response));
      connection.end();
    }

    /**
     * Se define el evento "update" que se ejecuta cuando se recibe una petición de tipo "update",
     * en el caso de que un cliente quiera modificar un funko de un usuario.
     * Se define la respuesta que se enviará al cliente.
     * Se cierra la conexión.
     */
    if (data.type == "update") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      const updated = app.modifyFunko(
        data.funkoPop.id,
        data.funkoPop.name,
        data.funkoPop.description,
        data.funkoPop.Tipo,
        data.funkoPop.genero,
        data.funkoPop.Franquicia,
        data.funkoPop.Numero_franquicia,
        data.funkoPop.Exclusivo,
        data.funkoPop.Caracteristicas_especiales,
        data.funkoPop.Precio
      );
      app.guardarDatos();
      if (updated) {
        const response: ResponseType = {
          type: "update",
          user: data.user,
          success: true,
        };
        connection.write(JSON.stringify(response));
      } else {
        const response: ResponseType = {
          type: "update",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }

    /**
     * Se define el evento "remove" que se ejecuta cuando se recibe una petición de tipo "remove",
     * en el caso de que un cliente quiera eliminar un funko de un usuario.
     * Se define la respuesta que se enviará al cliente.
     * Se cierra la conexión.
     */
    if (data.type == "remove") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      const removed = app.removeFunko(data.id);
      app.guardarDatos();
      if (removed) {
        const response: ResponseType = {
          type: "remove",
          user: data.user,
          success: true,
        };
        connection.write(JSON.stringify(response));
      } else {
        const response: ResponseType = {
          type: "remove",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }

    /**
     * Se define el evento "read" que se ejecuta cuando se recibe una petición de tipo "read",
     * en el caso de que un cliente quiera leer un funko de un usuario.
     * Se define la respuesta que se enviará al cliente.
     * Se cierra la conexión.
     */
    if (data.type == "read") {
      const app = new App(data.user);
      app.cargarDatos(data.user);
      const read = app.showFunkoById(data.id);
      if (read) {
        const response: ResponseType = {
          type: "read",
          user: data.user,
          success: true,
          funkoPop: read,
        };
        connection.write(JSON.stringify(response));
      }
      else {
        const response: ResponseType = {
          type: "read",
          user: data.user,
          success: false,
        };
        connection.write(JSON.stringify(response));
      }
      connection.end();
    }
  });
});

server.listen(60300, () => {
  console.log("Server running on port 60300");
});

server.on("error", (err) => {
  throw err;
});

server.on("close", () => {
  console.log("Server closed");
});

server.on("end", () => {
  console.log("Client disconnected");
});
