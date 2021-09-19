import { Server } from 'socket.io'
import { MainSocketsController } from '@modules/api/v1/controllers';

export const createSocket = async function(server) {
    const io = new Server( server, {pingTimeout: 60000, pingInterval: 200, origins:['*']});
	const devices 				= io.of('/devices');

  const MController     = await MainSocketsController(io, devices);

	devices.on('connection', socket => {
		//DashBoard
        socket.on('', MController.dummy);
	});
	return io;
}
