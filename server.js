import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import https from 'https';

const app = express();
const port = 3000;

// Load client certificates
const httpsAgent = new https.Agent({
  cert: fs.readFileSync('/certs/client.crt'),
  key: fs.readFileSync('/certs/client.key'),
  ca: fs.readFileSync('/certs/client-rootCA.pem')
});

// Template for the HTML response
const HTMLResponse = (message, isSuccess) => `
<!DOCTYPE html>
<html>
<head>
<title>MTLS Curl Tester</title>
<style>
  body { 
    color: white; 
    padding: 20px; 
    font-family: Arial, sans-serif; 
    background-color: ${isSuccess ? 'green' : 'red'};
  }
</style>
</head>
<body>
<h2>Resultat de la requête cURL vers le service KrakenD:</h2>
<p>${message}</p>
</body>
</html>
`;

app.get('/test-krakend', async (req, res) => {
  try {
    const response = await fetch('https://krakend:80/test', {
      method: 'GET',
      agent: httpsAgent
    });
    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
    const data = await response.text();
    const formattedData = JSON.stringify(JSON.parse(data), null, 4); // Parse and format the JSON data
    res.send(HTMLResponse(`Félicitation ! Vous avez réussi à simuler la Communication mTLS avec l'API Gateway INES. \nDonnées reçues: \n${formattedData}`, true));
//   res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.send(HTMLResponse(`Echec de la connexion vers le service KrakenD. \nError: \n${error.message}`, false));
//    res.status(500).send('Failed to connect to Krakend');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

