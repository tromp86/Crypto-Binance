import { itemsArray } from "./mainCrypto.js";

const amount = 3330;

let itemsContainer = document.getElementById("itemsContainer");
let remainingAmountElement = document.getElementById("remainingAmount");
let remainingProcentElement = document.getElementById("remainingProcent");
let myMoney = document.getElementById("myMoney");
let totalSelaryElement = document.getElementById("totalSelary");
let totalSelaryElementCAD = document.getElementById("totalSelaryCad");

totalSelaryElementCAD.contentEditable = "true";
const totalSellPrice = calculateTotalSellPrice();
totalSelaryElement.textContent = totalSellPrice;
totalSelaryElementCAD.textContent = 466;  

function updateValues() {
  let enteredValue = parseFloat(totalSelaryElementCAD.textContent) || 0;
  totalSelaryElement.textContent = totalSellPrice - enteredValue;
  totalSelaryElementCAD.textContent = enteredValue;
}

updateValues();

totalSelaryElementCAD.addEventListener("input", function() {
  updateValues();
});

const totalMoneySum = itemsArray.reduce(
  (acc, item) => acc + sum(item.money),
  0
);
myMoney.textContent = totalMoneySum - calculateTotalSellPrice();

const remainingAmount = amount - totalMoneySum;
remainingAmountElement.textContent = remainingAmount;
console.log(`сумма залишок: ${remainingAmount}`);
// шкала
let remainingFill = document.getElementById('remainingFill');
// Розрахунок у зворотному напрямку показує скільки ще треба
const fillPercentage = ((totalSellPrice / amount) * 100).toFixed(0);

remainingFill.style.width = fillPercentage + '%';
// шкала
const remainingProcent = ((totalMoneySum / amount) * 100).toFixed(0);
remainingProcentElement.textContent = `${100 - remainingProcent}%`;

itemsArray.sort((a, b) => sum(b.money) - sum(a.money));

itemsArray.forEach((item) => {
  const moneySum = sum(item.money);
  let avg = average(item.countCoin, item.money);
  let avgWithMultiplier = avg * 1.37;

  const countCoinSum = sum(item.countCoin);
  const countSellCoinSum = sum(item.countSellCoin);
  const countAvailableCoin = countCoinSum - countSellCoinSum;
  const priceSellSum = sum(item.priceSellSelary);

  // Створення картки
  let cardHTML = `
    <div class="card ${!item.static ? 'gray' : ''}">
      <p class="title-text">${item.name}</p>
      <div class="title">
        <div class="circle" style="background-color: ${item.color};"></div>
      </div>
      <p>Coin: <span class="bold">${countAvailableCoin.toFixed(3)}</span></p>
      <p>Deposit: <span class="bold">${sum(item.money)}$</span></p>
      <!-- <p>Procent Money: <span>${item.procentMoney}$</span></p> -->  
      <p>Average CAD: <span class="bold">${avgWithMultiplier.toFixed(2)}</span></p>
      <p>Average USD: <span class="bold">${avg.toFixed(2)}</span></p>
      <hr>
      <p>Sell Coin: <span class="boldSell">${countSellCoinSum}</span></p>
      <p>Only one position: <span class="boldSell">${(moneySum - priceSellSum) !== 0 ? sum(item.priceSellSelary) : 0}$</span></p>
    </div>
  `;

  // Додавання картки до контейнера
  itemsContainer.innerHTML += cardHTML;
});

function sum(array) {
  return array.reduce((acc, curr) => acc + curr, 0);
}
function average(array1, array2) {
  let sumCountCoin = sum(array1);
  let sumMoney = sum(array2);
  return sumMoney / sumCountCoin;
}
function calculateTotalSellPrice() {
  const totalSellPrice = itemsArray.reduce(
    (acc, item) => acc + sum(item.priceSellSelary),
    0
  );
  return totalSellPrice;
}

