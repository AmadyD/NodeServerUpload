var express = require('express');
var app = express();
var multer = require('multer')
var FTPStorage = require('multer-ftp')
var cors = require('cors');

app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'home/ftpuser/ftp/'+req.query.folder)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).array('file')

// var upload = multer({
//   storage: new FTPStorage({
//     basepath: '/files',
//     ftp: {
//       host: '82.165.116.238',
//       port:22,  
//       secure: true,
//       user: 'ftpuser',
//       password: 'Degzilla@1996'
//     }
//   })
// }).array('fileupload');

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// app.post('/upload', function (req, res, next) {
//   upload(req,res, function(err){
//     if(err){  
//       res.send('Error uploading file - ' + err);
//     }else{ 
//        res.send('File is uploaded - ' + JSON.stringify(req.file)); 
//     }
//   })    
// })


// var upload = multer({
//     storage: new FTPStorage({
//     destination: function (req, file, cb) {
//     cb(null, '/files')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname )
//   },
//       ftp: {
//         host: '82.165.116.238',
//         secure: true, // enables FTPS/FTP with TLS
//         user: 'ftpuser',
//         password: 'Degzilla@1996'
//       }
//     })
//   }).array('file')

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.post('/upload',function(req, res) {
     console.log("Répertoire "+req.query.folder)
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
            console.log("Erreur lors de l'upload du/des fichier(s)")
               return res.status(500).json(err)
           } else if (err) {
            console.log("Erreur lors de l'upload du/des fichier(s)")
               return res.status(500).json(err)
           }
           console.log("Fichier(s) uploadé(s)")
      return res.status(200).send(req.file)
    })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});