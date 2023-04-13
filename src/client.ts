import net from 'net';
import { program } from 'commander';

/**
 * El programa cliente realiza la conexión con 
 * el servidor y realiza el envío del comando.
 */
program
  
  .arguments('<command> [arguments...]')
  .description('Envía un comando al servidor')
  .action((args) => {
    const client = net.connect({ port: 60300 });


    client.on('data', data => {
      console.log(data.toString().trim());
      client.end();
    });

    client.on('end', () => {
      console.log(`Connected to server. Sending command: ${args}`);
      console.log('Muestra mensaje');
      client.write(`${args.join(' ')}`);
      console.log('Disconnected from server.');
    });
  });

program.parse(process.argv);
