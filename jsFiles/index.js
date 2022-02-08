// //!---------------- APP CLASS --------------------
function App() {
    this._mapObj = new Map(15);
    this._currentActivity;

    submitBtn.addEventListener("click", this._submitEvent.bind(this));
    containerEl.addEventListener("click", this._panToElement.bind(this));
}

App.prototype._activities = [];

//function for resetting the form
App.prototype._resetForm = function () {
    descEl.value = "";
    nameEl.value = "";
    distanceEL.value = "";
    dateEl.value = "";

    document.querySelector(".formDesign").classList.add("hidden");
};

//function for handling the submit button action
App.prototype._submitEvent = function (e) {
    e.preventDefault();
    if (Number(distanceEL.value) > 0) {
        this._currentActivity = new Activity(
            this._activities.length,
            this._mapObj.coords,
            this._mapObj.customPopupOptions
        );
        this._activities.push(this._currentActivity);
        this._resetForm();
        this._currentActivity._createElementSection();
    } else {
        alert("Enter a positive number for distance.");
        distanceEL.value = "";
        return;
    }
    this._mapObj._createMarkerIcon(
        this._currentActivity._emoji + this._currentActivity._name
    );
};

//function for panning the element to view
App.prototype._panToElement = function (e) {
    const sect = e.target.closest("section");
    if (sect.classList.contains("element")) {
        this._activities.forEach((act) => {
            if (act._id == sect.dataset.id) {
                this._mapObj.map.panTo(act._coordinates);
            }
        });
    }
};

//!--------- EXECUTION --------------
const app = new App();
