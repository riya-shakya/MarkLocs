//!---------------- MAP CLASS --------------------
function Map(zoomLevel) {
    this._coords = [];
    this._map = null;
    this._zoomLevel = zoomLevel;
    this._customPopupOptions = {
        minWidth: 100,
        maxWidth: 250,
        autoClose: false,
        closeOnClick: false,
        className: "popup",
    };
    this._designIcon = {
        iconSize: [50, 60],
        iconAnchor: [40, 50],
        popupAnchor: [-15, -46],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94],
    };

    Object.defineProperties(this, {
        coords: {
            get: function () {
                return this._coords;
            },
        },
        customPopupOptions: {
            get: function () {
                return this._customPopupOptions;
            },
        },
        map: {
            get: function () {
                return this._map;
            },
        },
    });

    //calling the function of current location
    this._getCurrentLocation();
}

//* function for getting current location of the user.
Map.prototype._getCurrentLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this._displayMap.call(this, position);
                this._onMapClickMethod(); //renders the onclick event on the map after display of the map
            },
            function () {
                alert("sorry your position could not be extracted");
            }
        );
    }
};

//*function for creating the tilelayer of the map which accepts dark mode as a boolean parameter
Map.prototype._createTileLayer = function (darkMode = true) {
    let _tileObject = {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };
    if (darkMode) _tileObject.className = "map-dark-theme"; //if darkmode then it adds the dark theme tiles class to the object

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        _tileObject
    ).addTo(this._map);
};

//*function for creating the marker icon which accepts the url of the icon to be displayed
Map.prototype._createMarkerIcon = function (popupString, imgUrl) {
    let _markerObject;
    if (imgUrl) {
        //block for a different marker icon.
        this._designIcon.iconUrl = imgUrl;

        _markerObject = L.marker(this._coords, {
            icon: L.icon(this._designIcon),
        });
    } else {
        _markerObject = L.marker(this._coords);
    }
    _markerObject
        .addTo(this._map)
        .bindPopup(popupString, this._customPopupOptions)
        .openPopup();
};

//* function for displaying the map.
Map.prototype._displayMap = function (position) {
    this._coords = [position.coords.latitude, position.coords.longitude];
    this._map = L.map("map").setView(this._coords, this._zoomLevel);
    this._createTileLayer();
    this._createMarkerIcon("🏡Home", "./images/home2.png");
};

//* an event handler function to handle a click on the map.
Map.prototype._onMapClickMethod = function () {
    this._map.on(
        "click",
        function (mapEvent) {
            this._coords = [mapEvent.latlng.lat, mapEvent.latlng.lng];

            //displaying of form to fill information
            document.querySelector(".formDesign").classList.remove("hidden");
        }.bind(this)
    );
};

//!-------------- EXECUTION --------------
// const mapObj = new Map(16);
// mapObj.getCurrentLocation();
