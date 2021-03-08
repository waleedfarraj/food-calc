'use strict'
var arr = []
var derTisch = document.getElementById('result')
let table = document.createElement('table')
function Order(name,item,qt,price){
this.name = name
this.item = item
this.qt = qt
this.price = price * qt
arr.push(this)
}


form.addEventListener('submit',ordering)
function ordering(event){
  event.preventDefault()
  var orignalTotal = orignalTotal || 0
let deliveryFee = event.target.fee.value
let hungryPerson = event.target.name.value
let food = event.target.order.value
let quantity = event.target.one.value
let price = event.target.money.value
new Order(hungryPerson,food,quantity,price)
for(var x = 0 ; x < arr.length ; x++){
  
orignalTotal += arr[x].price
}
console.log('orignalTotal',orignalTotal)
var deliveryCost = deliveryFee / arr.length
console.log('deliveryCost Per Person ;',deliveryCost)
let results = []

for(var x = 0 ; x < arr.length ; x++){
  let y  = arr[x].name + '=' + ( parseFloat(arr[x].price) + parseFloat(deliveryCost))
results.push(y)
}

console.log(results)

table.innerHTML=""

firstRowMaker()
contant(deliveryCost)

} 

function firstRowMaker(){
  let row = document.createElement('tr')
  let firstCell = document.createElement('th')
  firstCell.textContent='Name'
  let seconedCell = document.createElement('th')
  seconedCell.textContent='Share'
  row.appendChild(firstCell)
  row.appendChild(seconedCell)
table.appendChild(row)
derTisch.appendChild(table)
}
function contant(deliveryCost){
  let tbod = document.createElement('tbody')
for(var x = 0 ; x < arr.length ; x++){
  let row = document.createElement('tr')
  let first  = arr[x].name  
  let sec = ( parseFloat(arr[x].price) + parseFloat(deliveryCost))
    let firstCell = document.createElement('td')
  firstCell.textContent=first
  let seconedCell = document.createElement('td')
  seconedCell.textContent=sec
 row.appendChild(firstCell)
  row.appendChild(seconedCell)
tbod.appendChild(row)
}
table.appendChild(tbod)
}

