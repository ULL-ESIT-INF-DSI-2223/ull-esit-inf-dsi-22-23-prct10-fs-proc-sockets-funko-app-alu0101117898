import net from 'net';
import { exec } from 'child_process';

/**
 * El programa servidor realiza la conexión continua con
 * el cliente. Este recibe el comando a ejecutar dentro 
 * de la terminal, así como devolver por la terminal 
 * del cliente el resultado de la ejecución del comando
 */
const server = net.createServer(connection => {

  /**
   * Cuando el servidor reciba la petición y conexión
   * con un cliente, muestra el mensaje por pantalla.
   */
  console.log('Client connected.');

  connection.on('data', data => {
    const [command, ...args] = data.toString().trim().split(' ');
    console.log(`Received command: ${command} ${args}`);

    exec(`${command} ${args.join(' ')}`, (error, stdout, stderr) => {
      const output = error ? stderr : stdout;
      connection.write(output);
    });
  });

  /**
   * Muestra el mensaje cuando se cierre la conexión con el servidor,
   * de parte del cliente.
   */
  connection.on('close', () => {
    console.log('Client disconnected.');
  });
});

const PORT = 60300;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
