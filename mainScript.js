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
  let beerData = await getData("https://api.punkapi.com/v2/beers/random")
  document.querySelector(".beer-name").innerHTML = beerData[0].name
  
  let img = document.querySelector(".beer-img")
  img.src = beerData[0].image_url
  document.querySelector(".description").innerHTML = beerData[0].description

  // beerInfoPage(beerData)
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
  console.log(`Beer name: ${beer[0].name}`)
  console.log(`Beer description: ${beer[0].description}`)
  console.log(`Beer image(url): ${beer[0].image_url}`)
  console.log(`Beer alcohol by volume: ${beer[0].abv}`)
  console.log(`Beer volume: ${beer[0].volume.value} ${beer[0].volume.unit}`)

  let ingredients = []
  for (let i = 0; i < beer[0].ingredients.malt.length; i++) {
    ingredients.push(beer[0].ingredients.malt[i].name)
  }
  console.log(`Ingredients hops: ${ingredients}`)

  let hops = []
  for (let j = 0; j < beer[0].ingredients.hops.length; j++) {
    hops.push(beer[0].ingredients.hops[j].name)
  }
  console.log(`Beer hops: ${hops}`)

  console.log(`Beer food pairing: ${beer[0].food_pairing}`)
  console.log(`Beer brewers tips: ${beer[0].brewers_tips}`)
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