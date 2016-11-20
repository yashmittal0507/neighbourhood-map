
//global variables

var maps;
var markers = [];


var locations = [
	{
		name: 'Gwalior fort',
		location : { lat: 26.221761,
		           lng: 78.166419
		
	}},
	{
		name: 'Sanchi stupa',
		location:  { lat: 23.4873,
		lng: 77.7418
		
	}},
	{
		name: 'Khajurao group of monuments',
		location : {lat: 24.8318,
		            lng: 79.9199
		
	}},
	{
		name: 'Lal Bagh Palace',
		location: {lat: 22.7000, 
		           lng: 75.8470
		
	}},
	{
		name: 'Kanha Tiger Reserve',
		location: {lat: 22.3345, 
		           lng: 80.6115
		
	}},
	{
		name: 'Pachmarhi',
		location:{lat: 22.4674, 
		          lng: 78.4346
		
	}},
	{
		name: 'Madan Mahal Fort',
		location: {lat: 23.1483, 
		           lng: 79.9016
		
	}}
];





function initMap(){

	var self =this;
	maps = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.9734,lng: 78.6569 },
        zoom: 6
   });
	for (var i = 0; i < locations.length; i++) {
            // Get the position from the location array.
           var position = locations[i].location;
           var title = locations[i].name;
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
            map: maps,
            position: position,
            title: title,
            icon: {

            	url: 'img/marker.png',
                size: new google.maps.Size(25, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(12.5, 40)
            },
            animation: google.maps.Animation.DROP
       }); 

        markers.push(marker); 

     this.contentString = '<div class="info-window-content"><div class="title"><b>' + locations.name + "</b></div>" +
					     '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>"+
					     '<div class="content">' + self.wikiSnippet + "</div>";

  	this.infoWindow = new google.maps.InfoWindow({content: self.contentString});
  


	this.markers.addListener('click', function(){

		self.contentString = '<div class="info-window-content"><div class="title"><b>' + locations.name + "</b></div>" +
        '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
        '<div class="content">' + self.wikiSnippet + "</div>";
       
        
		self.infoWindow.open(maps, this);

		self.marker.setAnimation(google.maps.Animation.BOUNCE);
      	setTimeout(function() {
      		self.marker.setAnimation(null);
     	}, 2100);
	});

	// Marker bounces when triggered
	this.bounce = function(place) {
		google.maps.event.trigger(self.marker, 'click');
	};
};   	          

        
   }

   //add event Listener to every Marker

  var displayInfowindow = function(){

  	

}

function viewModel(){

		

}




//Pusing every location data into placesdata arra}


