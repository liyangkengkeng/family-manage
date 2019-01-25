const express = require('express');
const app = express();
const router = express.Router();
let modelUser = require('./server/schema.ts')

// router.get('/', (req, res) => res.send('home page!'));
// router.get('/test', (req, res) => res.send('testing!'));

router.get('/api/users/find', (req, res) => {
  console.log(req)
  modelUser.find({}, (err, doc) => {
    if (err) console.log(err);
    else if (doc) res.send(JSON.stringify(doc));
  });
});

app.use('/', router);

app.listen(3000, () => console.log('app listening on port 3000'));
