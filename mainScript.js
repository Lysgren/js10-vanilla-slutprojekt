"use strict";

let getData = async requestedData => {
  let request = await fetch(requestedData)
  let data  = await request.json()
  return data
}

let writeDataInDOM = (requestedElement, str) => {
  let element = document.querySelector(requestedElement);
  element.innerHTML = str
}

let randomBeer = async () => {
  let beerData = await getData("https://api.punkapi.com/v2/beers/random")
  document.querySelector(".beer-name").innerHTML = beerData[0].name
  
  if (beerData[0].image_url == null) {
    let img = document.querySelector(".beer-img")
    img.src = "/img/beerBottle.jpg"
  }
  else {
    let img = document.querySelector(".beer-img")
    img.src = beerData[0].image_url
  }

  document.querySelector(".description").innerHTML = beerData[0].description
  beerInfoPage(beerData)
}

let beerSearch = async () => {
  let value = document.querySelector("input.search-beer-input").value.toLowerCase()
  value = value.replace(/\s/g, '_')

  if (value.length > 0) {
    let beerName = await getData("https://api.punkapi.com/v2/beers?beer_name=" + value)
    //let beerHops = await getData("https://api.punkapi.com/v2/beers?hops=" + value)
    //let beerMalt = await getData("https://api.punkapi.com/v2/beers?malt=" + value)
    //let brewedBefore = await getData("https://api.punkapi.com/v2/beers?brewed_before=" + value)
    //let brewedAfter = await getData("https://api.punkapi.com/v2/beers?brewed_after=" + value)
  
    console.log(beerName)
    let list = document.querySelector(".beer-list")
    let children = list.children

    for (let i = 0; i < beerName.length; i++) {
      // console.log(searchedBeer[i].name)
      children[i].innerHTML = beerName[i].name
      if (i == 10) {
        console.log("Ten beers!")
        break
      }
    }
  }
}

let beerInfoPage = beer => {
  let ingredients = []
  for (let i = 0; i < beer[0].ingredients.malt.length; i++) {
    ingredients.push(beer[0].ingredients.malt[i].name)
  }

  let hops = []
  for (let j = 0; j < beer[0].ingredients.hops.length; j++) {
    hops.push(beer[0].ingredients.hops[j].name)
  }

  writeDataInDOM(".beer-name-info", beer[0].name)
  writeDataInDOM(".description", beer[0].description)
  writeDataInDOM(".alcohol-by-volume", `Beer alcohol by volume: ${beer[0].abv}`)
  writeDataInDOM(".volume", `Beer volume: ${beer[0].volume.value} ${beer[0].volume.unit}`)
  writeDataInDOM(".ingredients", `Ingredients: ${ingredients}`)
  writeDataInDOM(".hops", `Beer hops: ${hops}`)
  writeDataInDOM(".food-pairing", `Beer food pairing: ${beer[0].food_pairing}`)
  writeDataInDOM(".brewers-tips", `Beer brewers tips: ${beer[0].brewers_tips}`)
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