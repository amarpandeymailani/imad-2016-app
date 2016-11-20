var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto =  require('crypto');
var bodyParser =  require('body-parser');
var session = require('express-session');
 
var config = {
    user:'amarpandeymailani',
    database:'amarpandeymailani',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{ maxAge: 1000*60*60*24*30}
}));
var articles={
    'article-one':{
    title:'article-one:amar',
    heading:'article-one',
    date:'sep.28, 2016',
    content:` 
            <p>
                this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.
            </p>
            <p>
                this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.
            </p>
            <p>
                this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.this is the contet of my first article.
            </p>`
       },
    'article-two':{ title:'article-two:amar',
    heading:'article-two',
    date:'sep.29, 2016',
    content:` 
            <p>
                this is the contet of my second article.this is the contet of my second article.this is the contet of my second article.
            </p>`},
    'article-three':{ title:'article-three:three',
    heading:'article-three',
    date:'sep.30, 2016',
    content:` 
            <p>
                this is the contet of my third article.this is the contet of my third article.this is the contet of my third article.
            </p>`}
};
    
   function createTemplate(data){
       var title=data.title;
       var heading=data.heading;
       var date=data.date;
       var content=data.content;
       
     var htmlTemplate=`<html>
     <head>
         <title>
             ${title}
         </title>
         <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <link href="/ui/style.css" rel="stylesheet" />
        
     </head>
    
    
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}
            </div>
        </div>
     </body>
    </html>
   `;
   return htmlTemplate;
   }

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
 
 function hash (input,salt) {
     //how we do craete ahash
     var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
     return ["pkdf2","10000",salt,hashed.toString('hex')].join('$');
     
 }
 //this is 
 
 app.get('/hash/:input',function (req,res){
     var hashedString = hash(req.params.input,'this-is-some-random-string');
     res.send(hashedString);
 });
  
  app.post('/create-user',function(req,res){
      //username,password
      //{"username:amar,"password:password"}
      // JSON
      var username = req.body.username;
       var password = req.body.password;
      
      var salt = crypto.randomBytes(128).toString('hex');
      var dbString = hash(password,salt);
      pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function (err,result){
           if(err){
           res.status(500).send(err.tostring());
        }else{
            res.send('user succsessfuly created: ' + username);
        }
      });
  });
   app.post('/login',function(req,res){
        var username = req.body.username;
       var password = req.body.password;
      
      
     
      pool.query('SELECT * FROM "user" WHERE username = $1',[username],function (err,result){
           if(err){
           res.status(500).send(err.tostring());
        }else{
            if(result.rows.length===0){
                res.send(403).send('username/password is invalid');
            }else{
                //match the password 
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);//craeting a hash based on the password submitted and the  original  salt
            if(hashedPassword === dbString){
                 //set the session
                  req.session.auth = {userId:result.rows[0].Id};
                  //set cookie with a session id
                  //internally ,on the server iside,it maps the session id to an object
                  //{auth:{userid}}
                res.send('credentials correct');
        } else{
            res.send(403).send('username/password is invalid');
        }
            }
            
        }
      });
   });
   app.get('/check-login',function(req,res){
       if(req.session && req.session.auth && req.session.auth.userId){
           res.send('you are logged in: ' + req.session.auth.userId.toString());
        }   else{
            res.send('you are not logged in');
            
        }
       
       
   }); 
   app.get('/logout',function(req,res){
       
       delete req.session.auth;
       res.send('logged out');
       
       });
      
          
      
  
 var pool =new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request 
    //send the response
    pool.query('SELECT * from test',function(err,result){
        if(err){
           res.status(500).send(err.tostring());
        }else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
 
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) { //url submit-name?name= xxxx
    //get the name from the req.
    var name = req.query.name;
    names.push(JSON.stringify(name));
    //json javascript object notation   
  
});


app.get('/articles/:articleName', function (req, res) {
    //articleName=article-one
    //articles[articleName]=content object for articleone
    
  //select * from   article where title = '\'; DELETE where a = \'asdf'
  pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName] ,function(err,result){
if(err){
    res.status(500).send(err.toString());
    
} else {
      if(result.rows.length === 0){
          res.status(404).send('article not found');
          
      }
      else{
          var articleData = result.rows[0];
          res.send(createTemplate(articleData));
      }
    
}
  });
  
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
