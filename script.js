const btn = document.querySelectorAll(".tlacitko");

btn.forEach(function(tlacitko){
    tlacitko.addEventListener('click', function(){
        alert("Kliknul jsi na tlačítko");
    })
});