import * as express from 'express';
import { Server } from 'typescript-rest';
import * as Routes from './controller/AtendimentoController';


let app: express.Application = express();
Server.apply(Routes);
Server.buildServices(app);

 
app.listen(4200, function() {

  console.log('Rest Server listening on port 4200!');
});