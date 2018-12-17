
let i = 0;


function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    console.log(document.cookie);

}

function checkCookie() {
    visit = parseInt(getCookie("username"));
    if (visit !== 0) {
        setCookie("username", ++visit, 10);
    } else {
        setCookie("username", 1, 10);
        alert('This is your first time in this site!');
        visit = 0;
    }
    $("#comeback").empty();
    $("#comeback").html(visit + "&nbsp;");
}

$(document).ready(function () {
    $("#previous").click(function () {
    if(i<1)
        i=Setup.COUNTRYBALLS.length;
    $("#countryballdefault").attr("src", "/images/cball/" + Setup.COUNTRYBALLS[(--i)%Setup.COUNTRYBALLS.length]);  
});

$("#next").click(function () {
    
    $("#countryballdefault").attr("src", "/images/cball/" + Setup.COUNTRYBALLS[(++i) % Setup.COUNTRYBALLS.length]);  

});

checkCookie();
});





