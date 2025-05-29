const selectElement = document.getElementById("city-select");
const userZone = moment.tz.guess(); // e.g., "Africa/Johannesburg"

// Add user's current location to the top of the dropdown
const userOption = document.createElement("option");
userOption.value = userZone;
userOption.textContent = `Your Location (${userZone.replace("_", " ")})`;
userOption.selected = true;
selectElement.appendChild(userOption);

// Add other predefined city options
const cities = ["America/New_York", "Europe/London", "Asia/Tokyo"];

cities.forEach((city) => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city.split("/")[1].replace("_", " ");
  selectElement.appendChild(option);
});

let selectedCity = userZone;

function updateClock() {
  const now = moment().tz(userZone);
  document.getElementById("user-location").textContent = userZone.replace(
    "_",
    " "
  );
  document.getElementById("user-time").textContent = now.format(
    "dddd, MMMM D, YYYY | hh:mm:ss A"
  );
  document.getElementById("user-timezone").textContent =
    "Time Zone: " + userZone;

  // Update world clocks
  document.getElementById("ny-time").textContent = moment()
    .tz("America/New_York")
    .format("hh:mm:ss A");
  document.getElementById("london-time").textContent = moment()
    .tz("Europe/London")
    .format("hh:mm:ss A");
  document.getElementById("tokyo-time").textContent = moment()
    .tz("Asia/Tokyo")
    .format("hh:mm:ss A");

  // Update selected city display
  if (selectedCity) {
    const cityTime = moment().tz(selectedCity);
    document.getElementById("selected-city-time").textContent = cityTime.format(
      "dddd, MMMM D, YYYY | hh:mm:ss A"
    );
    document.getElementById("selected-city-timezone").textContent =
      "Time Zone: " + selectedCity;
  }
}

// When user changes selection
selectElement.addEventListener("change", function () {
  selectedCity = this.value;
  if (selectedCity) {
    document.getElementById("selected-city-box").style.display = "block";
    document.getElementById("selected-city-name").textContent = selectedCity
      .split("/")[1]
      .replace("_", " ");
  } else {
    document.getElementById("selected-city-box").style.display = "none";
  }
});

// Home link resets view
document.getElementById("home-link").addEventListener("click", function (e) {
  e.preventDefault();
  selectedCity = "";
  selectElement.value = "";
  document.getElementById("selected-city-box").style.display = "none";
});

setInterval(updateClock, 1000);
updateClock();
