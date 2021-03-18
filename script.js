// Write your JavaScript code here!
window.addEventListener("load", function () {
  const submitBtn = document.querySelector("#formSubmit");
  let pilotName = document.querySelector("input[name=pilotName]");
  let copilotName = document.querySelector("input[name=copilotName]");
  let fuelLevel = document.querySelector("input[name=fuelLevel");
  let cargoMass = document.querySelector("input[name=cargoMass");
  let faultyItems = document.getElementById("faultyItems");

  fetch("https://handlers.education.launchcode.org/static/planets.json").then(
    function (response) {
      response.json().then(function (json) {

        const pickNewPlanet = () => {
          const missionTarget = document.getElementById("missionTarget");

          let randomplanet = Math.floor(Math.random() * json.length);

          missionTarget.innerHTML = `
       <h2>Mission Destination</h2>
       <div id="targets">
        <ol>
          <li>Name: ${json[randomplanet].name}</li>
          <li>Diameter: ${json[randomplanet].diameter}</li>
          <li>Star: ${json[randomplanet].star}</li>
          <li>Distance from Earth: ${json[randomplanet].distance}</li>
          <li>Number of Moons: ${json[randomplanet].moons}</li>
       </ol>
       </div>
       <img src="${json[randomplanet].image}">
       <br> `;
        };

        pickNewPlanet();

        let planetPicker = document.getElementById("planetPicker");
        planetPicker.addEventListener("click", function () {
          pickNewPlanet();
        });
      });
    }
  );



  submitBtn.addEventListener("click", function () {
    if (
      pilotName.value === "" ||
      copilotName.value === "" ||
      fuelLevel.value === "" ||
      isNaN(fuelLevel.value) ||
      cargoMass.value === "" ||
      isNaN(cargoMass.value)
    ) {
      window.alert("All fields must be filled in with correct data type.");
    };
    faultyItems.style.visibility = "visible";

    if(pilotName.value !== ''){
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} ready.`;
    }
    if(copilotName.value !== ''){
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} ready.`;
    }

    if (fuelLevel.value < 10000) {
      document.getElementById("fuelStatus").innerHTML =
        "Not enough fuel for the journey. Add some more.";
      document.getElementById("launchStatus").innerHTML =
        "Shuttle not ready for launch.";
      document.getElementById("launchStatus").style.color = "red";
    };

    if (cargoMass.value > 10000) {
      document.getElementById("cargoStatus").innerHTML = "Too much weight!";
      document.getElementById("launchStatus").innerHTML =
        "Shuttle not ready for launch.";
      document.getElementById("launchStatus").style.color = "red";
    };

    if (cargoMass.value <= 10000 && fuelLevel.value >= 10000 && cargoMass.value !== '') {
      document.getElementById("launchStatus").style.color = "Green";
      document.getElementById("launchStatus").innerHTML =
        "Shuttle is ready for launch.";
      document.getElementById("cargoStatus").innerHTML =
        "Cargo mass low enough for launch.";
      document.getElementById("fuelStatus").innerHTML =
        "Fuel level high enough for launch.";
    }
    event.preventDefault();
  });
});
