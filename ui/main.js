//counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
    //craete a request object
    var request = newXMLHttpRequest();
    
    
    //capture the response and store it to in a variable
    request.onreadystatechange = function() {
      if(request.readystate===XMLHttpRequest.done)  {
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
     
     
     
