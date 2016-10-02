//counter code
var button = document.getElementById('counter');

button.onclick = function () {
    //craete a request object
    var request = new XMLHttpRequest();
    
    
    //capture the response and store it to in a variable
    request.onreadystatechange = function() {
      if(request.readystate===XMLHttpRequest.DONE)  {
          //take some action 
          if (request.status===200){
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
              
          }
          
      }
      //not done yet
    };
    
   //make the request
   request.open('GET',"http://amarpandeymailani.imad.hasura-app.io/counter",true);
   request.send(null);
     
};
     
     
     
