//!---------------- MAP CLASS --------------------
function Map(zoomLevel) {
    this._coords = [];
    this._map = null;
    this._zoomLevel = zoomLevel;
}

//* function for getting current location of the user.
Map.prototype._getCurrentLocation = function (position) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            this._displayMap.bind(this),
            function () {
                alert("sorry your position could not be extracted");
            }
        );
    }
};

//* function for displaying the map.
Map.prototype._displayMap = function (position) {
    this._coords = [position.coords.latitude, position.coords.longitude];
    this._map = L.map("map").setView(this._coords, this._zoomLevel);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    L.marker(this._coords)
        .addTo(this._map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
};

const mapObj = new Map(15);
mapObj._getCurrentLocation();
