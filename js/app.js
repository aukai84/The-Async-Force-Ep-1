/*jshint esversion: 6*/
function personRequest() {
  console.log("this request is ", this.responseText);
  //storing string object..parsing it.. saving to variable
  let personObject = JSON.parse(this.responseText);
  console.log(personObject);
  document.getElementById("person4Name").innerHTML = personObject.name;

  function homeRequeset() {
    console.log("homeworld request", this.responseText);
    let worldObject = JSON.parse(this.responseText);
    console.log(worldObject)
    document.getElementById("person4HomeWorld").innerHTML = worldObject.name;
  }

    let homeReq = new XMLHttpRequest();
    homeReq.addEventListener("load", homeRequeset);
    homeReq.open("GET", personObject.homeworld);
    homeReq.send();
}



let perReq = new XMLHttpRequest();
perReq.addEventListener("load", personRequest);
perReq.open("GET", "http://swapi.co/api/people/4/");
perReq.send();