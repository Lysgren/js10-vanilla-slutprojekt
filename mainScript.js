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

let beerSearch = async page => {
  let value = document.querySelector("input.search-beer-input").value.toLowerCase()
  value = value.replace(/\s/g, '_')

  if (value.length > 2) {
    let beers = await getData("https://api.punkapi.com/v2/beers?beer_name=" + value + "&page=" + page + "&per_page=10")

    console.log(beers.length)

    if (beers.length == 0) {
      beers = await getData("https://api.punkapi.com/v2/beers?beer_name=" + value + "&page=" + (page - 1) + "&per_page=10")
    }

    //let beerHops = await getData("https://api.punkapi.com/v2/beers?hops=" + value)
    //let beerMalt = await getData("https://api.punkapi.com/v2/beers?malt=" + value)
    //let brewedBefore = await getData("https://api.punkapi.com/v2/beers?brewed_before=" + value)
    //let brewedAfter = await getData("https://api.punkapi.com/v2/beers?brewed_after=" + value)
  
    console.log(beers)
    let list = document.querySelector(".beer-list")
    list.innerHTML = '';
    // let children = list.children

    for (let i = 0; i < beers.length; i++) {
      //children[i].innerHTML = beers[i].name
      let listItem = document.createElement("li")
      listItem.innerHTML = beers[i].name
      list.append(listItem)
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

  writeDataInDOM(".beer-name-info", `Name:${beer[0].name}`)
  writeDataInDOM(".description", `Description:${beer[0].description}`)
  writeDataInDOM(".alcohol-by-volume", `Beer alcohol by volume: ${beer[0].abv}`)
  writeDataInDOM(".volume", `Beer volume: ${beer[0].volume.value} ${beer[0].volume.unit}`)
  writeDataInDOM(".ingredients", `Ingredients: ${ingredients}`)
  writeDataInDOM(".hops", `Beer hops: ${hops}`)
  writeDataInDOM(".food-pairing", `Beer food pairing: ${beer[0].food_pairing}`)
  writeDataInDOM(".brewers-tips", `Beer brewers tips: ${beer[0].brewers_tips}`)
  writeDataInDOM(".beer-img-info", beer[0].image_url)
}

let main = () => {
  document.querySelector(".random-beer").addEventListener("click", function() {
    randomBeer()
  });

  let page = 1
  document.querySelector("input").oninput = function(event) {
    page = 1
    beerSearch(page)
  };

  document.querySelector(".button-minus").addEventListener("click", function() {
    page = (page > 1) ? page -= 1 : 1

    beerSearch(page)
  });

  document.querySelector(".button-plus").addEventListener("click", function() {
    page++
    beerSearch(page)
  });
  
  randomBeer()
}

main();