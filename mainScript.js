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
  
  let img = document.querySelector(".beer-img")
  img.src = beerData[0].image_url
  

  beerInfoPage(beerData)
}

let beerSearch = async () => {
  let value = document.querySelector("input.search-beer-input").value.toLowerCase()
  value = value.replace(/\s/g, '_')

  let searchedBeer = await getData("https://api.punkapi.com/v2/beers?beer_name=" + value)
  console.log(searchedBeer)

  for (let i = 0; i < searchedBeer.length; i++) {
    // console.log(searchedBeer[i].name)
    if (i == 10) {
      console.log("Ten beers!")
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

  writeDataInDOM(".beer-name-info",beer[0].name)
  writeDataInDOM(".description", `Description:${beer[0].description}`)
  writeDataInDOM(".alcohol-by-volume", `Beer alcohol by volume: ${beer[0].abv}`)
  writeDataInDOM(".volume", `Beer volume: ${beer[0].volume.value} ${beer[0].volume.unit}`)
  writeDataInDOM(".ingredients", `Ingredients: ${ingredients}`)
  writeDataInDOM(".hops", `Beer hops: ${hops}`)
  writeDataInDOM(".food-pairing", `Beer food pairing: ${beer[0].food_pairing}`)
  writeDataInDOM(".brewers-tips", `Beer brewers tips: ${beer[0].brewers_tips}`)
  // let imgSrc=document.querySelector(".beer-img-info")
  // imgSrc.src=beer[0].image_url
  
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