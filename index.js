const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const prettyBytes = require('pretty-bytes');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.post('/get-file-size', upload.array('file'), (req, res, next)=>{
  console.log('request body ', req.files);
  try {
    res.json({ size: prettyBytes(req.files[0].size)});
  }catch(err) {
    res.json({error: 'Unknown Error.'});
  }
});

app.listen(port, ()=>{
  console.log('app is running on port ', port);
});