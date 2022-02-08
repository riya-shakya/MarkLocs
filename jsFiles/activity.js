//!--------------- HTML Elements -----------------
const activityNameEl = document.getElementById("placesDropDown");
const nameEl = document.getElementsByName("nameOfPlace")[0];
const dateEl = document.getElementsByName("dateVisited")[0];
const distanceEL = document.getElementsByName("distanceFromHome")[0];
const descEl = document.getElementsByName("description")[0];
const formEl = document.querySelector(".formDesign").firstElementChild;
const submitBtn = document.getElementById("submitBtn");
const containerEl = document.getElementById("infoContainer");

//!--------------- ACTIVITY CLASS ---------------------
function Activity(id, coordinates, customPopupOptions) {
    this._id = id;
    this._name = nameEl.value;
    this._activity = activityNameEl.value;
    this._description = descEl.value;
    this._date = dateEl.value;
    this._distance = distanceEL.value;
    this._coordinates = coordinates;

    switch (this._activity) {
        case "restaurant":
            this._emoji = "🍜";
            customPopupOptions.className = "restaurant-popup"; //adding the custom class for various options.
            break;
        case "park":
            this._emoji = "🏞️";
            customPopupOptions.className = "park-popup";
            break;
        case "movieTheatre":
            this._emoji = "📽️";
            customPopupOptions.className = "movie-popup";
            break;
        case "partyPlace":
            this._emoji = "🎊";
            customPopupOptions.className = "party-popup";
            break;
    }
}

//----------- function for creation of the element -------
Activity.prototype._createElementSection = function () {
    const infoSection = document.createElement("section");
    infoSection.classList.add("element");
    infoSection.dataset.id = this._id;

    const heading = document.createElement("h2");
    heading.textContent = this._emoji + this._name;
    infoSection.append(heading);

    infoSection.insertAdjacentHTML(
        "beforeend",
        `<div class="element-info">
                    <h3>Visited on ${this._date}</h3>
                    <h3>${this._activity[0].toUpperCase()}${this._activity.slice(
            1
        )}</h3>
                    <h3>${this._distance}km away</h3>
                </div>`
    );

    const descriptionEl = document.createElement("h3");
    descriptionEl.textContent = `${this._description}`;

    infoSection.append(descriptionEl);
    document.getElementById("infoContainer").append(infoSection);
};
