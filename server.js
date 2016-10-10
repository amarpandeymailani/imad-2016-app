var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
            ${date}
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
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter + 1;
  res.send(counter.toString());
});

app.get('/:articleName', function (req, res) {
    //articleName=article-one
    //articles[articleName]=content object for articleone
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
var names = [];
app.get('/submit-name/:name', function (req, res) {
    //get the name from the req.
    var name = req.params.name;
    names.push(JSON.stringify(name));
    //json javascript object notation
  res.send(names);//to do
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
