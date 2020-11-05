"use strict";

let writeDataInDOM = (position, item) => {
  let data = document.createElement("div");
  data.innerHTML = item
  position.append(data)
}

let getData = async requestedData => {
  let request = await fetch(requestedData)
  let data  = await request.json()
  return data
}

let renderBeer = async randomBeerNumber => {
  let randomBeer = "https://api.punkapi.com/v2/beers/" + randomBeerNumber

  let beerData = await getData(randomBeer)
  console.log(beerData[0].name)
}

let main = () => {
  let randomBeerNumber = Math.floor((Math.random() * 325) + 1);
  
  document.querySelector(".random-beer").addEventListener("click", function() {
    randomBeerNumber = Math.floor((Math.random() * 325) + 1);
    renderBeer(randomBeerNumber)
  });
  
  renderBeer(randomBeerNumber)
}

main();