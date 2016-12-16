/*jshint esversion: 6*/
const firstUl = document.getElementById('filmList');
//first person request showing name and homeworld
function personRequestOne() {
  let personObject = JSON.parse(this.responseText);
  document.getElementById("person4Name").innerHTML = personObject.name;

  function homeRequest() {
  let homeWorldObject = JSON.parse(this.responseText);
  document.getElementById("person4HomeWorld").innerHTML = homeWorldObject.name;
  }
  requestHelper(personObject.homeworld, homeRequest);
}

//second person request showing name and species
function personRequestTwo() {
  let personObject = JSON.parse(this.responseText);
  document.getElementById("person14Name").innerHTML = personObject.name;

  function speciesRequest() {
    let speciesObject = JSON.parse(this.responseText);
    document.getElementById("person14Species").innerHTML = speciesObject.name;
  }
  requestHelper(personObject.species, speciesRequest);
}

//film request listing each film element and film title
function filmRequest() {
  let filmArray = JSON.parse(this.responseText).results;

  for(let i = 0; i < filmArray.length; i++){
    let planetsUl = document.createElement('ul');
    createList(filmArray, i, planetsUl);
    for(let j = 0; j < filmArray[i].planets.length; j++){
        requestHelper(filmArray[i].planets[j], planetRequest(planetsUl));
        console.log(planetRequest(planetsUl));
    }
  }
  function planetRequest(list) {
    let planetObject = JSON.parse(this.responseText);
    console.log(planetObject)
    let planetNameList = document.createElement('li');
    let planetNameHeader = document.createElement('h4');
    planetNameHeader.innerHTML = planetObject.name;
    planetNameList.appendChild(planetNameHeader);
    list.appendChild(planetNameList);
    return planetObject;

  }
}

function createList(array, index, list) {
  let filmlist = document.createElement('li');
  let filmheader = document.createElement('h2');
  let planetHeader = document.createElement('h3');
  planetHeader.innerHTML = "Planets";
  filmheader.innerHTML = array[index].title;
  filmlist.appendChild(filmheader);
  filmlist.appendChild(planetHeader);
  filmlist.appendChild(list);
  firstUl.appendChild(filmlist);

}

function requestHelper(link, listener) {
  let newReq = new XMLHttpRequest();
  newReq.addEventListener("load", listener);
  newReq.open("GET", link);
  newReq.send();
}

requestHelper("http://swapi.co/api/people/4/", personRequestOne);
requestHelper("http://swapi.co/api/people/14/", personRequestTwo);
requestHelper("http://swapi.co/api/films/", filmRequest);