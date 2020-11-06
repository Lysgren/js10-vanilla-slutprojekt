"use strict";

let getData = async requestedData => {
  let request = await fetch(requestedData)
  let data  = await request.json()
  return data
}

let writeDataInDOM = (position, item) => {
  let data = document.createElement("div");
  data.innerHTML = item
  position.append(data)
}

let randomBeer = async () => {
  let randomBeer = "https://api.punkapi.com/v2/beers/random"

  let beerData = await getData(randomBeer)
  
  // console.log(beerData[0].name)
  // console.log(beerData[0])

  document.querySelectorAll(".beer-name").innerHTML=beerData[0].name
  document.querySelectorAll(".beer-img").src=beerData[0].image_url
  document.querySelector(".description").innerHTML=beerData[0].description

  beerInfoPage(beerData)
}

let beerSearch = async () => {
  let value = document.querySelector("input.search-beer-input").value.toLowerCase()
  value = value.replace(/\s/g, '_')

  let searchedBeer = await getData("https://api.punkapi.com/v2/beers?beer_name=" + value)

  for (let i = 0; i < searchedBeer.length; i++) {
    console.log(searchedBeer[i].name)
  }
}

let beerInfoPage = beer => {

  console.log(beer[0])
  //console.log(`Beer name: ${beer[0].name}`)
  //console.log(`Beer description: ${beer[0].description}`)
  //console.log(`Beer image(url): ${beer[0].image_url}`)
  //console.log(`Beer alcohol by volume: ${beer[0].abv}`)
  //console.log(`Beer volume: ${beer[0].volume.value} ${beer[0].volume.unit}`)
  
  //console.log(`Beer ingredients: ${beer[0].ingredients}`)
  console.log(`Beer hops: ${beer[0].ingredients.hops}`)
  console.log("Beer hops: " + beer[0].ingredients.hops)
  console.log(beer[0].ingredients.hops.length)
  console.log(beer[0].ingredients.hops[0])

  //console.log("Beer ingredients: " + beer[0].ingredients)

  //console.log(`Beer food pairing: ${beer[0].food_pairing}`)
  //console.log(`Beer brewers tips: ${beer[0].brewers_tips}`)
}

let main = () => {
  document.querySelector(".random-beer").addEventListener("click", function() {
    randomBeer()
  });

  document.querySelector("input").oninput = function(event) {
    beerSearch()
  };
  
  randomBeer()
}

main();