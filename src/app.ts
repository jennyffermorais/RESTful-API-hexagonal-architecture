import express from 'express';

class App {
   public app: express.Application;

   constructor() {
      this.app = express();
      this.configureRoutes();
   }

   private configureRoutes() {
      this.app.get('/', this.handleRootRequest);
   }

   private handleRootRequest(req: express.Request, res: express.Response) {
      res.send({ versao: '1' });
   }
}

export default new App().app;
