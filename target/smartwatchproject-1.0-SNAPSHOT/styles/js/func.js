var _numIMG = 1;
var _speedSilde = 6000;
var _width = 0;
var _n = 1;
var map;
$(function () {
    //$(document).bind("contextmenu",function(e){	return false; });
    //displaySection();

    //setInterval(function(){ chgBG() },_speedSilde);
    
    _width = getWidthWindow();
    $('img.bg').css('width', _width);
    //console.log(_width + "px");
    chgBG();
    setInterval(function () {
        chgBG()
    }, _speedSilde);

    $(window).resize(function () {
        _width = getWidthWindow();
        $('img.bg').css('width', _width);
    })
    // ----- PROFIL -----
    listenMenu("menu_profil", ".profil_1,.profil_2,.profil_3");
    // ----- PHYSIQUE -----
    listenMenu("menu_physique", ".physique_1,.physique_2,.physique_3,.physique_4");
    // ----- OBJECTIF -----
    listenMenu("menu_objectif", ".objectif,.ss_objectif_1_1,.ss_objectif_1_2,.ss_objectif_1_3,.ss_objectif_1_4,.ss_objectif_1_5");
    // ----- PREFERENCE -----
    //listenMenu("menu_preference",".preference_1,.preference_2,.preference_3");

});
/*
function dezoomImgBG(){
    $("img.bg_inscription").css({
        webkitTransform: "scale(1)"
    })
}
function zoomImgBG(){
    $("img.bg_connexion").css({
        webkitTransform: "scale(1.5)"
    })
}*/
function getWidthWindow() {
    return $(window).width();
}
function chgBG() {
    //console.log(_n);
    if (_n == 1) {

        deplaceIMG('bg_1', 0);
        deplaceIMG('bg_2', (_width));
        deplaceIMG('bg_3', (_width) * 2);
        chgMSG("Votre programme d'entrainement individuel sur votre poignet.", "Parfaitement adapté à vos objectifs.");
    } else if (_n == 2) {
        deplaceIMG('bg_1', -(_width));
        deplaceIMG('bg_2', 0);
        deplaceIMG('bg_3', (_width));
        chgMSG("Smart Health planifie intelligement de nouveaux objectifs.", "Atteignez des sommets.");

    } else if (_n == 3) {
        deplaceIMG('bg_1', -2 * (_width));
        deplaceIMG('bg_2', -(_width));
        deplaceIMG('bg_3', 0);
        chgMSG("Améliorez vos parcours et allez au-delà de vos limites.", "Progressez à votre rythme.");
        _n = 0;

    } else {
        _n = 0;
    }
    _n++;
}

function deplaceIMG(_id, _width) {
    $('img#' + _id).animate({
        left: _width + "px"
    }, 1200);
}
/*
 function chgBG(){
 if (_numIMG>3) _numIMG=1;
 console.log(_numIMG);
 if (_numIMG==1){
 chgMSG("Votre programme d'entrainement individuel sur votre poignet.","Parfaitement adapté à vos objectifs.");
 } else if (_numIMG==2) {
 chgMSG("Smart Health planifie intelligement de nouveaux objectifs.","Atteignez des sommets.");
 } else if (_numIMG==3) {
 chgMSG("Améliorez vos parcours et allez au-delà de vos limites.","Progressez à votre rythme.");
 } 
 $("img#bg").attr("src","./data/"+_numIMG+".jpg");
 _numIMG++;
 }
 */
function chgMSG(_msgA, _msgB) {
    $("div#message").find("span#msgA").fadeOut(500, function () {
        $(this).text(_msgA);
    }).fadeIn(600);
    $("div#message").find("span#msgB").fadeOut(500, function () {
        $(this).text(_msgB);
    }).fadeIn(600);
}

var _view = true;
function viewMenu() {
    //console.log(_view);
    $("div#filter_dark").attr('onclick', 'viewMenu()');
    var _nb = 0;
    if (!_view) {
        $("div#filter_dark").fadeOut();
        _nb = -263;
    } else {
        $("div#filter_dark").show();
        _nb = 0;
    }
    $("div#menu").css({
        right: _nb + "px"
    })
    _view = !_view;
}
function viewCalendarActivities() {
    var _calendar=$('div#calendarFull');
    $("div#filter_dark").attr('onclick', 'viewCalendarActivities()');
    _calendar.toggleClass('off');
    var _hasClass = _calendar.hasClass('off');
    if (_hasClass) {
        _calendar.css({
            transition: '0.4s',
            webkitTransform: 'scale(0.1)'
        }).promise().done(function () {
            _calendar.animate({
                top: '-1000px',
            }, 500, function () {
                _calendar.fadeOut();
                $("div#filter_dark").fadeOut();
            })
        })
    } else {
        _calendar.css({
            transition: '0s'
        })
        $("div#filter_dark").fadeIn();
        _calendar.fadeIn();
        _calendar.animate({
            top: '0px'
        }, 800, function () {
            _calendar.css({
                transition: '0.3s',
                webkitTransform: 'scale(1)'
            })
        })
    }
}

function listenMenu(_id, _class) {
    $("#" + _id).unbind("click").bind("click", function () {
        if ($("#" + _id).hasClass("menu_open")) {
            $(_class).slideUp();
        } else {
            $(_class).slideDown();
        }
        $("#" + _id).toggleClass("menu_open");
    })
}

function viewMap(latitude, longitude) {
    $("button#viewMap").unbind("click").bind("click", function () {
        if ($(this).hasClass("map_open")) {
            $("div#map_canvas").slideUp();
            $(this).find("span").html("<br>Afficher la map");
            $(this).find("span").attr("class", "icon-arrow-down-3");
            $("div#map_canvas").empty();
            //$("div#map_canvas").removeAttr("src");
        } else {
            $("div#map_canvas").slideDown(500, function () {
                drawMap(latitude, longitude);
                //put_Marker(43.6961876,7.285362199999999);
            });
            $(this).find("span").html("<br>Cacher la map");
            $(this).find("span").attr("class", "icon-arrow-up-3");
            //$("iframe#webmap").attr("src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92299.33014380158!2d7.25281705!3d43.70319045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd0106a852d31%3A0x40819a5fd979a70!2sNice!5e0!3m2!1sfr!2sfr!4v1430042770430");
        }
        //console.log(this);
        $(this).toggleClass("map_open");
    })
}

function drawMap(values_lat, values_lng) {
    var initialLocation = new google.maps.LatLng(43.6070825, 7.074496);
    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 12,
        center: initialLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var tab_values_lat = values_lat.split("/");
    var tab_values_lng = values_lng.split("/");

    for (var j = 0; j < tab_values_lat.length; j++) {
        var latitude = tab_values_lat[j].split(",");
        var longitude = tab_values_lng[j].split(",");

        var flightPlanCoordinates = new Array();
        for (var i = 0; i < latitude.length; i++) {
            flightPlanCoordinates.push(new google.maps.LatLng(latitude[i], longitude[i]));
        }

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }
    else
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
}

function put_Marker(_latitude, _longitude) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(_latitude, _longitude),
        map: map
    });
}