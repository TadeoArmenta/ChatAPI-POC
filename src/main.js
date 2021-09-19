import './config/env';
import { LoggerService } from './services/logger.service';
import { App } from './app';
import http from 'http';
import https from 'https';
import fs from 'fs';
import { ApiV1 } from '@modules'

const PORT = process.env.API_PORT || 4040;

async function bootstrap () {
  let server;
	// eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'production') {
		let options = {
			key: fs.readFileSync('/etc/letsencrypt/live/'+  process.env.DOMAIN +'/privkey.pem'),
			cert: fs.readFileSync('/etc/letsencrypt/live/'+  process.env.DOMAIN +'/fullchain.pem'),
			ca: fs.readFileSync('/etc/letsencrypt/live/'+  process.env.DOMAIN +'/chain.pem'),
		};

		server = https.createServer(options, App)
	} else {
		server = http.createServer(App);
  }
  // CREATE SOCKET-IO SERVER
  // ******************************************************************
    App.set('io', ApiV1.sockets(server));
  // ******************************************************************

	server.listen(PORT,'0.0.0.0', (err) => {
		if (err) return LoggerService.error(err.message);
		const host = LoggerService.format(process.env.DOMAIN +":"+ PORT + __API_PREFIX, 'underline');
		LoggerService.log(`Application API is now up and running on ${host}`);
	});
}
bootstrap().then().catch();
