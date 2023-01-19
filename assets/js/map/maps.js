(function (e) {
    if (!Array.prototype.forEach){
        e.forEach = e.forEach || function (action, that) {
            for (var i = 0, l = this.length; i < l; i++){
                if (i in this){
                    action.call(that, this[i], i, this);
                }  
            }
        };
    }

})(Array.prototype);


var mapObject,
    markers = [],
    markersData = {
        'Marker': [
            {
                location_latitude: 51.550913,
                location_longitude: -0.456819,
                status: 'Close Now',
                map_img_url: 'assets/img/listing/01.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },
            {
                location_latitude: 51.521706,
                location_longitude: -0.065418,
                status: 'Open Now',
                map_img_url: 'assets/img/listing/02.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },
            {
                location_latitude: 51.419960,
                location_longitude: -0.990052,
                status: 'Open Now',
                map_img_url: 'assets/img/listing/03.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },
            {
                location_latitude: 51.617477,
                location_longitude: -0.172400,
                status: 'Open Now',
                map_img_url: 'assets/img/listing/04.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },
            {
                location_latitude: 51.574847,
                location_longitude: -0.167921,
                status: 'Open Now',
                map_img_url: 'assets/img/listing/05.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },
            {
                location_latitude: 51.481659,
                location_longitude: -0.339207,
                status: 'Open Now',
                map_img_url: 'assets/img/listing/06.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },

            {
                location_latitude: 51.420938,
                location_longitude: -0.467646,
                map_img_url: 'assets/img/listing/01.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            },
            {
                location_latitude: 51.501623,
                location_longitude: -0.231335,
                status: 'Open Now',
                map_img_url: 'assets/img/listing/02.jpg',
                address: '25/B Milford Road, New York',
                price: '20,000',
                open_hour: '9:00AM - 5:00PM',
                title: 'New Modern Apartment',
                url: 'listing-single.html',
            }
        ]

    };

var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(51.574847, -0.167921),
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    mapTypeControl: false,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    panControl: false,
    panControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    scrollwheel: false,
    scaleControl: false,
    scaleControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
    },
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    },
    styles: [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]
};

var marker;
mapObject = new google.maps.Map(document.getElementById('listing-map'), mapOptions);
for (var key in markersData)
    markersData[key].forEach(function (item) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
            map: mapObject,
            icon: 'assets/img/listing/map-marker.svg',
        });

        if ('undefined' === typeof markers[key])
            markers[key] = [];
        markers[key].push(marker);
        google.maps.event.addListener(marker, 'click', (function () {
            closeInfoBox();
            getInfoBox(item).open(mapObject, this);
            mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
        }));

    });

new MarkerClusterer(mapObject, markers[key]);

function hideAllMarkers() {
    for (var key in markers)
        markers[key].forEach(function (marker) {
            marker.setMap(null);
        });
};



function closeInfoBox() {
    $('div.infoBox').remove();
};

function getInfoBox(item) {
    return new InfoBox({

        content: 
            '<div class="listing-map-item">'+
                '<div class="listing-img">'+
                    '<img src="' + item.map_img_url +'" alt="">'+
                '</div>'+
                '<div class="listing-content">'+
                    '<h4 class="listing-title"><a href="' + item.url + '">' + item.title + '</a></h4>'+
                    '<p class="listing-sub-title"><i class="far fa-location-dot"></i>' + item.address + '</p>'+
                    '<p class="listing-open-hour"><i class="far fa-clock"></i>' + item.open_hour + '</p>'+
                    '<div class="listing-price">Start From <span class="listing-price-amount">$' + item.price + '</span></div>'+
                '</div>'+
                '<div class="listing-map-item-arrow"></div>'+
            '</div>',
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(10, 92),
        closeBoxMargin: '',
        closeBoxURL: "assets/img/listing/close.png",
        isHidden: false,
        alignBottom: true,
        pane: 'floatPane',
        enableEventPropagation: true
    });
};

function onHtmlClick(location_type, key) {
    google.maps.event.trigger(markers[location_type][key], "click");
}

console.error = function(){};


