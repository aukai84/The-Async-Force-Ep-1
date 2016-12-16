/*jshint esversion: 6*/

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
    createList(filmArray,i);
    for(let j = 0; j < filmArray[i].planets.length; j++){

    }
  }
}

function createList(array, index) {
  let list = document.createElement('li');
  let header = document.createElement('h2');
  let planetHeader = document.createElement('h3');
  planetHeader.innerHTML = "Planets";
  header.innerHTML = array[index].title;
  list.appendChild(header);
  list.appendChild(planetHeader);
  document.getElementById('filmList').appendChild(list);
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