/*jshint esversion: 6*/
const firstUl = document.getElementById('filmList');

function personRequestOne() {
  let personObject = JSON.parse(this.responseText);
  document.getElementById("person4Name").innerHTML = personObject.name;

  function homeRequest() {
  let homeWorldObject = JSON.parse(this.responseText);
  document.getElementById("person4HomeWorld").innerHTML = homeWorldObject.name;
  }
  requestHelper(personObject.homeworld, homeRequest);
}

function personRequestTwo() {
  let personObject = JSON.parse(this.responseText);
  document.getElementById("person14Name").innerHTML = personObject.name;

  function speciesRequest() {
    let speciesObject = JSON.parse(this.responseText);
    document.getElementById("person14Species").innerHTML = speciesObject.name;
  }
  requestHelper(personObject.species, speciesRequest);
}

function filmsRequest() {

  let filmsArray = JSON.parse(this.responseText).results;

  for(let i = 0; i < filmsArray.length; i++){
    let planetsUl = document.createElement('ul');
    createList(filmsArray, i, planetsUl);
    for(let j = 0; j < filmsArray[i].planets.length; j++){
        createPlanets(planetsUl, filmsArray[i].planets[j]);
    }
  }
}

function createPlanets(list, url) {

    requestHelper(url, planetRequest);

    function planetRequest() {
      let planetObject = JSON.parse(this.responseText);
      let planetNameList = document.createElement('li');
      let planetNameHeader = document.createElement('h4');
      planetNameHeader.innerHTML = planetObject.name;
      planetNameList.appendChild(planetNameHeader);
      list.appendChild(planetNameList);
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
requestHelper("http://swapi.co/api/films/", filmsRequest);