import db from '../../db.json';

export default function (request, response) {
  
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  //TRATANDO ERRO DE CORS - DIZENDO PARA O NAVEGADOR QUE ELE PODE FAZER REQUEST DE FORA DA APP.
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATH,DELETE,POST,PUT');

  response.json(db);
}