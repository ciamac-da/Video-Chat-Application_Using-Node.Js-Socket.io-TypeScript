//Cia's Version!
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

//Pusher erstellen
const pusher = new Pusher({
    appId: 'XXX-API-ID',
    key: 'XXX-API-KEY',
    secret: 'XXX-API-SECRET',
    cluster: 'XXX-API-CLUSTER',
    encrypted: true
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

  // Guthentictation für die Kanal;
  app.post("/pusher/auth", (req, res) => {
      const socketId = req.body.socket_id;
      const channel = req.body.channel_name;
      var presenceData = {
        user_id:
          Math.random()
            .toString(36)
            .slice(2) + Date.now()
      };
      const auth = pusher.authenticate(socketId, channel, presenceData);
      res.send(auth);
    });



//listen Port
app.listen(3000, () => {
    return console.log('Server is up on 3000')
});