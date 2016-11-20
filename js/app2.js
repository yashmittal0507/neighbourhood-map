'use strict';

var maps;
var styles = [];

//model

var locations = [{
    name: 'Gwalior fort',
    lat: 26.221761,
    lng: 78.166419

}, {
    name: 'Sanchi',
    lat: 23.4873,
    lng: 77.7418

}, {
    name: 'Khajurao group of monuments',
    lat: 24.8318,
    lng: 79.9199

}, {
    name: 'Lal Bagh',
    lat: 22.7000,
    lng: 75.8470

}, {
    name: 'Kanha Tiger Reserve',
    lat: 22.3345,
    lng: 80.6115

}, {
    name: 'Pachmarhi',
    lat: 22.4674,
    lng: 78.4346

}, {
    name: 'Madan Mahal, Jabalpur',
    lat: 23.1483,
    lng: 79.9016

}];

// Adding a different style to Map 
styles = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#aee2e0"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#abce83"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#769E72"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#7B8758"
    }]
}, {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#EBF4A4"
    }]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "color": "#8dab68"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#5B5B3F"
    }]
}, {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#ABCE83"
    }]
}, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#A4C67D"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#9BBF72"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#EBF4A4"
    }]
}, {
    "featureType": "transit",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#87ae79"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#7f2200"
    }, {
        "visibility": "off"
    }]
}, {
    "featureType": "administrative",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "visibility": "on"
    }, {
        "weight": 4.1
    }]
}, {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#495421"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}]

//defining the opening and closing width of side navigation



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function Newmap() {

    maps = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        styles: styles,
        center: {
            lat: 22.9734,
            lng: 78.6569
        },
        mapTypeControl: false
    });

}




// Creating a view Model

function MapdisplayModel() {
    var self = this;

    this.placesdata = ko.observableArray([]);
    this.searchTerm = ko.observable("");

    //displaying a map

    Newmap();

    // Adding locations to the marker
    locations.forEach(function(placesinfo) {
        self.placesdata.push(new Myplaces(placesinfo));
    });

    // Performing filtering search

    this.searchitems = ko.computed(function() {
        var filter = self.searchTerm().toLowerCase();
        if (!filter) {
            self.placesdata().forEach(function(placesinfo) {
                placesinfo.visible(true);
            });
            return self.placesdata();
        } else {
            return ko.utils.arrayFilter(self.placesdata(), function(placesinfo) {
                var string = placesinfo.name.toLowerCase();
                var result = (string.search(filter) >= 0);
                placesinfo.visible(result);
                return result;
            });
        }
    }, self);

    // maKing the google map responsive
    google.maps.event.addDomListener(window, "resize", function() {

        var center = maps.getCenter();

        google.maps.event.trigger(maps, "resize");
        maps.setCenter(center);
    });

}



var Myplaces = function(locdata) {
    var self = this;
    this.name = locdata.name;
    console.log(this);
    this.lat = locdata.lat;
    this.lng = locdata.lng;
    this.visible = ko.observable(true);

    var wikiRequestTimeout = setTimeout(function() {
        self.smallinfo = "Retrieve wikiarticle process failed";
    }, 1000);

    // Wiki search url
    var Artilcewiki = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.name + '&limit=1&format=json&callback=wikiCallback';
    $.ajax({
        url: Artilcewiki,
        dataType: 'jsonp',
        success: function(locdata) {
            self.infoWindow.setContent("The Wikiarticle loading is in process");
            // add the wikiSnippet data
            self.smallinfo = locdata[2];
            if (self.smallinfo == "") {
                self.smallinfo = "Unable to find supporting wikiarticle";
            }
            clearTimeout(wikiRequestTimeout);
        },
    });

    this.contentString = '<div class="displayed-data"><div class="location-name"><b>' + locdata.name + "</b></div>" +

        '<div class="wiki-data">' + self.smallinfo + "</div>";


    this.infoWindow = new google.maps.InfoWindow({
        content: self.contentString
    });

    // add marker
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(locdata.lat, locdata.lng),
        map: maps,
        icon:

        {
            url: 'img/marker2.png',
            size: new google.maps.Size(60, 80),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 10)
        },
        animation: google.maps.Animation.DROP,
        title: locdata.name
    });

    // displaying the markers based on filtering search
    this.showMarker = ko.computed(function() {
        if (this.visible() === true) {
            this.marker.setMap(maps);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);




    // show information for a marker when clicked
    this.marker.addListener('click', function() {


        self.contentString = '<div class="displayed-data"><div class="location-name"><b>' + locdata.name + "</b></div>" +
            '<div class="wiki-data">' + self.smallinfo + "</div>"

        self.infoWindow.setContent(self.contentString);

        self.infoWindow.open(maps, this);




        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2000);
    });
    this.bounce = function(place) {
        google.maps.event.trigger(self.marker, 'click');
    };
    // closing the infowindow when mouse leaves the marker
    this.marker.addListener('mouseout', function() {

        self.infoWindow.close();
    });

};

// Start app
function initMap() {
    ko.applyBindings(new MapdisplayModel());
}

// Google Error
function errorHandling() {
    alert("Oh so sorry to load google maps.");
}