let i = 0;
$(document).ready(function () {
    $("#previous").click(function () {
    if(i<1)
        i=Setup.COUNTRYBALLS.length;
    $("#countryballdefault").attr("src", "/images/cball/" + Setup.COUNTRYBALLS[(--i)%Setup.COUNTRYBALLS.length]);  
});

$("#next").click(function () {
    
    $("#countryballdefault").attr("src", "/images/cball/" + Setup.COUNTRYBALLS[(++i) % Setup.COUNTRYBALLS.length]);  

});
document.cookie = "username = Meral; "

});


