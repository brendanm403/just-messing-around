const numberFormatter = Intl.NumberFormat('en-US');
// player coins //
if (!localStorage.getItem("coins")) {
  localStorage.setItem("coins", 0);
};

let coins = localStorage.getItem("coins");


// plays a sound when currency item is clicked //
const clickSound = function() {
  const audio = new Audio;
  audio.src = "coin-sounds/5_coins.ogg";
  audio.playbackRate = 2;
  audio.play();
}

// function that picks a random number in the specified range //
const randomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// constructor function to make currency item objects //
function Currency(commonClass, rarity, selected, source, value) {
  this.commonClass = commonClass;
  this.rarity = rarity;
  this.selected = selected;
  this.source = source;
  this.value = value;
};

// making all the objects //
const bigNugget = new Currency("currency-item", 10, false, "images/big-nugget.png", 10000);
const bigPearl = new Currency("currency-item", 9, false, "images/big-pearl.png", 8000);
const rareCandy = new Currency("currency-item", 8, false, "images/rare-candy.png", 5000);
const nugget = new Currency("currency-item", 7, false, "images/nugget.png", 1000);
const starPiece = new Currency("currency-item", 7, false, "images/star-piece.png", 1000);
const pearl = new Currency("currency-item", 6, false, "images/pearl.png", 700);
const starDust = new Currency("currency-item", 6, false, "images/star-dust.png", 700);
const moonStone = new Currency("currency-item", 5, false, "images/moon-stone.png", 400);
const sunStone = new Currency("currency-item", 5, false, "images/sun-stone.png", 400);
const dawnStone = new Currency("currency-item", 4, false, "images/dawn-stone.png", 300);
const shinyStone = new Currency("currency-item", 4, false, "images/shiny-stone.png", 300);
const duskStone = new Currency("currency-item", 4, false, "images/dusk-stone.png", 300);
const waterStone = new Currency("currency-item", 3, false, "images/water-stone.png", 200);
const leafStone = new Currency("currency-item", 3, false, "images/leaf-stone.png", 200);
const thunderStone = new Currency("currency-item", 3, false, "images/thunder-stone.png", 200);
const fireStone = new Currency("currency-item", 3, false, "images/fire-stone.png", 200);
const redShard = new Currency("currency-item", 2, false, "images/red-shard.png", 15);
const yellowShard = new Currency("currency-item", 2, false, "images/yellow-shard.png", 15);
const blueShard = new Currency("currency-item", 1, false, "images/blue-shard.png", 10);
const greenShard = new Currency("currency-item", 1, false, "images/green-shard.png", 10);

// creating array of these currency objects //
const currencyArr = [bigNugget, bigPearl, nugget, starPiece, pearl, blueShard, greenShard, yellowShard, redShard, moonStone, leafStone, fireStone, thunderStone, waterStone, sunStone, rareCandy, starDust, duskStone, shinyStone, dawnStone];

// randomly orders the array //
const shuffleArray = function(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  // return arr;
}

// renders the players coins on screen //
const displayCoins = function() {
  document.getElementById("player-coins").innerHTML = numberFormatter.format(coins);
}

// selects if an item will stock based on rarity //
const selectCurrencyItems = function(arr) {
  arr.forEach(function(item) {
    if (item.rarity === 10) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum === 1) {
        item.selected = true;
      } 
    } else if (item.rarity === 9) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 2) {
        item.selected = true;
      } 
    } else if (item.rarity === 8) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 3) {
        item.selected = true;
      } 
    } else if (item.rarity === 7) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 4) {
        item.selected = true;
      }
    } else if (item.rarity === 6) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 5) {
        item.selected = true;
      }
    } else if (item.rarity === 5) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 6) {
        item.selected = true;
      }
    } else if (item.rarity === 4) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 7) {
        item.selected = true;
      }
    } else if (item.rarity === 3) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 8) {
        item.selected = true;
      }
    } else if (item.rarity === 2) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 80) {
        item.selected = true;
      }
    } else if (item.rarity === 1) {
      let randNum = Math.ceil(Math.random()*100);
      if (randNum <= 90) {
        item.selected = true;
      }
    }
  });
}

const removePopUp = function() {
  document.getElementById("pop-up-value-text").remove();
}

// creates an image element, sets attributes, renders on screen, adds event listener //
const createImg = function(arrItem) {
  let renderItem = document.createElement("img");
  renderItem.classList.add(arrItem.commonClass);
  renderItem.src = arrItem.source;
  document.querySelector(".currency-grid").appendChild(renderItem);
  renderItem.addEventListener("click", function(event) {
    clickSound();
    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", "pop-up-value-text")
    let text = document.createTextNode(`+${arrItem.value}`);
    paragraph.appendChild(text);
    paragraph.style.position = "absolute";
    paragraph.style.left = event.clientX - 15 + "px";
    paragraph.style.top = event.clientY - 45 + "px";
    paragraph.style.margin = 0;
    paragraph.style.color = "green";
    document.body.appendChild(paragraph);
    setTimeout(removePopUp, 400);
    coins =  Number(localStorage.getItem("coins"));
    coins += arrItem.value;
    localStorage.setItem("coins", coins);
    displayCoins();
    renderItem.remove();
  });
}

// sets selected property back to false //
const resetCurrencyObject = function(arr) {
  arr.forEach(function(arrItem) {
    if (arrItem.selected === true) {
      arrItem.selected = false;
    }
  });
}

// allows you to click on items in the currency grid by removing a class //
const allowClick = function() {
  const allowOn = document.querySelector(".left-side");
  allowOn.classList.remove("disable-click")  
}

// prevents the player from spam clicking as many items as they can //
const preventClickSpam = function() {
  const preventOn = document.querySelector(".left-side");
  preventOn.addEventListener("click", function() {
    preventOn.classList.add("disable-click");
    setTimeout(allowClick, 2000);
  });
}

// creates the currency items that were selected by looping through the array //
const createCurrencyItem = function(arr) {
  arr.forEach(function(arrItem) {
    if (arrItem.selected === true) {
      createImg(arrItem);
    } 
    // can use this code to spawn multiple of an item //
    // if (arrItem.rarity <= 2) {
    //   createImg(arrItem);
    // } 
  }); 
}

// removes the currency item from screen if it exists //
const deleteCurrencyItem = function() {
  let itemsOnScreen = document.querySelectorAll(".currency-item");
  itemsOnScreen.forEach(function(item) {
    if (item) {
      item.remove();
    }
  })  
}

// main function to pass into setInterval to control everything //
const spawnItems = function() {
  shuffleArray(currencyArr);
  selectCurrencyItems(currencyArr);
  createCurrencyItem(currencyArr);
  resetCurrencyObject(currencyArr);
  setTimeout(deleteCurrencyItem, 2000);
}


//**************** All of this has been put in the event listener on the images in the create image function */
// document.querySelector(".left-side").addEventListener("click", function(event) {
//   console.log(event.clientX, event.clientY);
//   let paragraph = document.createElement("p");
//   let text = document.createTextNode("200");
//   paragraph.appendChild(text);
//   paragraph.style.position = "absolute";
//   paragraph.style.left = event.clientX - 10 + "px";
//   paragraph.style.top = event.clientY - 20 + "px";
//   paragraph.style.margin = 0;
//   document.body.appendChild(paragraph);
// })

preventClickSpam();
displayCoins();
setInterval(spawnItems, 3000);