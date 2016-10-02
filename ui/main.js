//counter code
var button = document.getElementbyId('counter');
var counter = 0;
button.click = function () {
    //make request to a counter end point
    
    //capture the response and store it to in a variable
    
    //render the variable in the correct span
     counter = counter + 1;
     var span = document.getElementbyId('count');
     span.innerHTML = counter.toString();
     
};
     
     
     
