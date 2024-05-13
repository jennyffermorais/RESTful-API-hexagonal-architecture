import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT || 8080;

App.listen(port, () => {
   console.log(`Servidor executando na porta ${port}`);
});
