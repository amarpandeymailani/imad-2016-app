console.log('Loaded!');
//change the main text div 
var element=document.getElementById('main-text');
element.innerHTML= 'NEW VALUE';
//move the image
var img = document.getElementById('madi');
img.onclick = function(){
    img.style.marginLeft='100px';
};