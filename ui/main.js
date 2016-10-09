//counter code
var button =document.getElementById('counter');

button.onclick = function() {
    //create a request object 
    var request = new XMLHttpRequest();
    
    //capture a response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if (request.status === 200){
                var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();  
            }
        }
        //not done yet 
    }
    //make the request
    request.open('GET','http://amarpandeymailani.imad.hasura-app.io/counter', true);
    request.send(null);
    
};
//submit name
var nameInput = document.getElementById('name');
var name =nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
   // make a req. to the server and send the name 
   // capture the name of a list and render is as a list 
   var names = ['name1', 'name2','name3','name4'];
   var list = '';
   for(var i = 0; i< names.length;i++){
       list += '<li>' + names[i] + '</li>';
   }
   var ul = document.getElementById('namelist');
   ul.innerHTNL = list; 
    };
     
     
