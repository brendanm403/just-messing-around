const numberFormatter = Intl.NumberFormat('en-US');
// player coins //
if (!localStorage.getItem("coins")) {
  localStorage.setItem("coins", 0);
};

let coins = localStorage.getItem("coins");
let currentHighestValue = 0;


// plays a sound when currency item is clicked //
const clickSound = function() {
  const audio = new Audio;
  audio.src = "coin-sounds/5_coins.ogg";
  audio.playbackRate = 2;
  audio.play();
}

const errorSound = function() {
  const audio = new Audio;
  audio.src = "coin-sounds/error.ogg";
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
const redShard = new Currency("currency-item", 1, false, "images/red-shard.png", 5);
const yellowShard = new Currency("currency-item", 1, false, "images/yellow-shard.png", 5);
const blueShard = new Currency("currency-item", 1, false, "images/blue-shard.png", 5);
const greenShard = new Currency("currency-item", 1, false, "images/green-shard.png", 5);

const deepSeaScale = new Currency("currency-item", 3, false, "images/deep-sea-scale.png", 200);
const dragonScale = new Currency("currency-item", 3, false, "images/dragon-scale.png", 200);
const prismScale = new Currency("currency-item", 3, false, "images/prism-scale.png", 200);
const everStone = new Currency("currency-item", 1, false, "images/everstone.png", 5);
const eviolite = new Currency("currency-item", 2, false, "images/eviolite.png", 20);
const floatStone = new Currency("currency-item", 1, false, "images/float-stone.png", 5);
const hardStone = new Currency("currency-item", 1, false, "images/hard-stone.png", 5);
const ironBall = new Currency("currency-item", 1, false, "images/iron-ball.png", 5);
const lightClay = new Currency("currency-item", 2, false, "images/light-clay.png", 20);
const ovalStone = new Currency("currency-item", 1, false, "images/oval-stone.png", 5);

// creating array of these currency objects //
const currencyArr = [bigNugget, bigPearl, nugget, starPiece, pearl, blueShard, greenShard, yellowShard, redShard, moonStone, leafStone, fireStone, thunderStone, waterStone, sunStone, rareCandy, starDust, duskStone, shinyStone, dawnStone, deepSeaScale, dragonScale, everStone, eviolite, floatStone, hardStone, ironBall, lightClay, ovalStone, prismScale];


// get access to the values of all items on the screen
// store values in an array or object
const getHighestValue = function(arr) {
  let valuesArr = [];
  currentHighestValue = 0;
  arr.forEach(function(item) {
    if(item.selected === true) {
      let value = item.value;
      valuesArr.push(value);
      if (value > currentHighestValue) {
        currentHighestValue = value;
        // console.log('CHV', currentHighestValue);
      }
    }
  });
  // return valuesArr;
  console.log(currentHighestValue);
}


// compare the value of the item clicked to all other values
// make a variable thats aboolean, push all results into new array
// then loop through that array and make sure every value is true
const compareValues = function(event) {
  let value = Number(event.target.classList[1].substring(1));  
  console.log(value);
  if (value >= currentHighestValue) {
    return true
  } else {
    return false
  }
}

// if it is higher than all other values or it shares the highest value with other items add coins
// remove item
// if it is not the highest value do not add coins or remove item
// text pop up indicating you were wrong

 


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

// selects which items will appear, limits to 9 //
const selectCurrencyItems = function(arr) {
  let total = 0;
  for (i = 0; i <= arr.length - 1; i++) {
    if (total < 9) {
      if (arr[i].rarity === 10) {
        let randNum = Math.ceil(Math.random()*300);
        if (randNum === 1) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 9) {
        let randNum = Math.ceil(Math.random()*280);
        if (randNum <= 2) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 8) {
        let randNum = Math.ceil(Math.random()*260);
        if (randNum <= 3) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 7) {
        let randNum = Math.ceil(Math.random()*240);
        if (randNum <= 4) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 6) {
        let randNum = Math.ceil(Math.random()*220);
        if (randNum <= 5) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 5) {
        let randNum = Math.ceil(Math.random()*200);
        if (randNum <= 6) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 4) {
        let randNum = Math.ceil(Math.random()*180);
        if (randNum <= 7) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 3) {
        let randNum = Math.ceil(Math.random()*160);
        if (randNum <= 8) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 2) {
        let randNum = Math.ceil(Math.random()*140);
        if (randNum <= 10) {
          arr[i].selected = true;
          total++;
        } 
      } else if (arr[i].rarity === 1) {
        let randNum = Math.ceil(Math.random()*100);
        if (randNum <= 90) {
          arr[i].selected = true;
          total++;
        } 
      }
    }    
  }
}

// displays the value with a text pop up when an item is clicked on //
const displayItemValuePopUp = function(itemValue) {
  let paragraph = document.createElement("p");
  paragraph.setAttribute("id", "pop-up-value-text")
  let text = document.createTextNode(`+${itemValue}`);
  paragraph.appendChild(text);
  paragraph.style.position = "absolute";
  paragraph.style.left = 415 + "px";
  paragraph.style.top =  170 + "px";
  paragraph.style.margin = 0;
  paragraph.style.color = "green";
  paragraph.style.fontSize = "25px";
  document.body.appendChild(paragraph);
}

const removeItemValuePopUp = function() {
  document.getElementById("pop-up-value-text").remove();
}

const displayWrongChoicePopUp = function() {
  let paragraph = document.createElement("p");
  paragraph.setAttribute("id", "pop-up-value-text")
  let text = document.createTextNode("X");
  paragraph.appendChild(text);
  paragraph.style.position = "absolute";
  paragraph.style.left = 415 + "px";
  paragraph.style.top =  170 + "px";
  paragraph.style.margin = 0;
  paragraph.style.color = "red";
  paragraph.style.fontSize = "25px";
  document.body.appendChild(paragraph);  
}

const increaseCoins = function(arrItem) {
  coins =  Number(localStorage.getItem("coins"));
      coins += arrItem.value;
      localStorage.setItem("coins", coins);  
}

// creates an image element, sets attributes, renders on screen, adds event listener //
const createImg = function(arrItem) {
  let renderItem = document.createElement("img");
  renderItem.classList.add(arrItem.commonClass, `v${arrItem.value}`);
  renderItem.src = arrItem.source;
  document.querySelector(".currency-grid").appendChild(renderItem);
  renderItem.addEventListener("click", function(event) {
    preventClickSpam();
    if (compareValues(event) === true) {
      clickSound();
      displayItemValuePopUp(arrItem.value);
      setTimeout(removeItemValuePopUp, 700);
      increaseCoins(arrItem);
      displayCoins();
      renderItem.remove();
    } else {
      errorSound();
      displayWrongChoicePopUp();
      setTimeout(removeItemValuePopUp, 700);
    }
    
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

// prevents the player from spam clicking as many items as they can //
const preventClickSpam = function() {
  const preventOn = document.querySelectorAll(".currency-item");
  preventOn.forEach(function(item) {
    item.classList.add("disable-click");
  });
}

// creates the currency items that were selected by looping through the array //
const createCurrencyItem = function(arr) {
  arr.forEach(function(arrItem) {
    if (arrItem.selected === true) {
      createImg(arrItem);
    } 
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
  getHighestValue(currencyArr);
  createCurrencyItem(currencyArr);
  resetCurrencyObject(currencyArr);
  setTimeout(deleteCurrencyItem, 1500);
}

displayCoins();
setInterval(spawnItems, randomRange(5000, 10000));
