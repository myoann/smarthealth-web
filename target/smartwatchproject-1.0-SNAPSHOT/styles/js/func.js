var _numIMG=1;
var _speedSilde=3000;
var map;
$(function(){
	//$(document).bind("contextmenu",function(e){	return false; });
	//displaySection();

	setInterval(function(){ chgBG() },_speedSilde);

	// ----- PROFIL -----
	listenMenu("menu_profil",".profil_1,.profil_2,.profil_3");
	// ----- PHYSIQUE -----
	listenMenu("menu_physique",".physique_1,.physique_2,.physique_3,.physique_4");
	// ----- OBJECTIF -----
	listenMenu("menu_objectif",".objectif,.ss_objectif_1_1,.ss_objectif_1_2,.ss_objectif_1_3,.ss_objectif_1_4,.ss_objectif_1_5");
	// ----- PREFERENCE -----
	//listenMenu("menu_preference",".preference_1,.preference_2,.preference_3");
        
        $('#calendar').fullCalendar({
            lang: 'fr',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [
                {
                    title: 'All Day Event',
                    start: '2015-05-01'
                },
                {
                    title: 'Long Event',
                    start: '2015-05-07',
                    end: '2015-05-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2015-05-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2015-05-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2015-05-11',
                    end: '2015-05-13'
                },
                {
                    title: 'Meeting',
                    start: '2015-05-12T10:30:00',
                    end: '2015-05-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2015-05-12T12:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2015-05-12T14:30:00'
                },
                {
                    title: 'Happy Hour',
                    start: '2015-05-12T17:30:00'
                },
                {
                    title: 'Dinner',
                    start: '2015-05-12T20:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2015-05-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2015-05-28'
                }
            ]
        });
})

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

function chgMSG(_msgA,_msgB){
	$("div#message").find("span#msgA").text(_msgA);
	$("div#message").find("span#msgB").text(_msgB);
}

function listenMenu(_id,_class){
	$("#"+_id).unbind("click").bind("click",function(){
		if ($("#"+_id).hasClass("menu_open")){
			$(_class).slideUp();
		}else{
			$(_class).slideDown();
		}
		$("#"+_id).toggleClass("menu_open");
	})
}

function viewMap(latitude, longitude){
	$("button#viewMap").unbind("click").bind("click",function(){
		if ($(this).hasClass("map_open")){
			$("div#map_canvas").slideUp();
			$(this).find("span").html("<br>Afficher la map");
			$(this).find("span").attr("class","icon-arrow-down-3");
			$("div#map_canvas").empty();
			//$("div#map_canvas").removeAttr("src");
		}else{
			$("div#map_canvas").slideDown(500,function(){
                            alert(latitude);
                            alert(longitude);
				drawMap(latitude, longitude);
				//put_Marker(43.6961876,7.285362199999999);
			});
			$(this).find("span").html("<br>Cacher la map");
			$(this).find("span").attr("class","icon-arrow-up-3");
			//$("iframe#webmap").attr("src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92299.33014380158!2d7.25281705!3d43.70319045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd0106a852d31%3A0x40819a5fd979a70!2sNice!5e0!3m2!1sfr!2sfr!4v1430042770430");
		}
		//console.log(this);
		$(this).toggleClass("map_open");
	})
}

function drawMap(values_lat, values_lng) {
        var initialLocation = new google.maps.LatLng(43.6070825,7.074496);
	map = new google.maps.Map(document.getElementById("map_canvas"), {
		zoom: 12,
		center: initialLocation,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
        var tab_values_lat = values_lat.split("/");
        var tab_values_lng = values_lng.split("/");
        
        for (var j = 0; j< tab_values_lat.length;j++) {
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

function put_Marker(_latitude,_longitude){
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(_latitude,_longitude), 
		map: map
	});
}