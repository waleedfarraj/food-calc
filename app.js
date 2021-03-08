'use strict'
var arr = []
var deliveryFee  
var orignalTotal = orignalTotal || 0
var derTisch = document.getElementById('result')
let table = document.createElement('table')
let tbod = document.createElement('tbody')
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
  
 deliveryFee = event.target.fee.value
let hungryPerson = event.target.name.value
let food = event.target.order.value
let quantity = event.target.one.value
let price = event.target.money.value
new Order(hungryPerson,food,quantity,price)
let deliveryCost = doMath(deliveryFee)




firstRowMaker()
content(deliveryCost)

} 
function firstRowMaker(){
    table.innerHTML=""
  let row = document.createElement('tr')
  let firstCell = document.createElement('th')
  firstCell.textContent='Name'
  let seconedCell = document.createElement('th')
  seconedCell.textContent='Share'
  let thirdCell = document.createElement('th')
  thirdCell.textContent = 'Order'
  let thirdCellPoint5 = document.createElement('th')
  thirdCellPoint5.textContent = 'Qty'
  let fourthCell = document.createElement('th')
  fourthCell.textContent = 'OOPS!'
  row.appendChild(firstCell)
  row.appendChild(seconedCell)
  row.appendChild(thirdCell)
  row.appendChild(thirdCellPoint5)
  row.appendChild(fourthCell)
 table.appendChild(row)
derTisch.appendChild(table)
}
function content(deliveryCost){
  tbod.innerHTML=''
for(var x = 0 ; x < arr.length ; x++){
  let row = document.createElement('tr')
  row.id = x
  let first  = arr[x].name  
  let price = arr[x].price || 0
  let sec = ( parseFloat(price) + parseFloat(deliveryCost))
    let firstCell = document.createElement('td')
  firstCell.textContent=first
  let seconedCell = document.createElement('td')
  seconedCell.textContent=sec
  let thirdCell = document.createElement('td')
  thirdCell.textContent= arr[x].item
  let thirdCellPoint5 = document.createElement('td')
  thirdCellPoint5.textContent = arr[x].qt
  let fourthCell = document.createElement('td')
  let btn = document.createElement('button')
  btn.innerHTML = 'Cancel'
 row.appendChild(firstCell)
 row.appendChild(seconedCell)
 row.appendChild(thirdCell)
 row.appendChild(thirdCellPoint5)
 row.appendChild(fourthCell)
 fourthCell.appendChild(btn)
 btn.onclick = removeOrder
 tbod.appendChild(row)
}
table.appendChild(tbod)
}
function doMath(deliveryFee){
    for(var x = 0 ; x < arr.length ; x++){
  
        orignalTotal += arr[x].price
        }
        console.log('orignalTotal',orignalTotal)
       var  deliveryCost = deliveryFee / arr.length || 0
        console.log(arr.length)
        console.log('deliveryCost Per Person ;',deliveryCost)
        let results = []
        console.log(deliveryCost)
        for(var x = 0 ; x < arr.length ; x++){
            console.log(arr[x].price)
            console.log(deliveryCost)
          let y  = arr[x].name + '=' + ( parseFloat(arr[x].price) + parseFloat(deliveryCost))
        results.push(y)
        }
        console.log(results)
        console.log({deliveryCost})
        return deliveryCost
}
function removeOrder(x){
    console.log('working')
    let rowId = x.path[2].id
    console.log(rowId)
    arr.splice(rowId,1)
    tbod.deleteRow(rowId)
     let deliveryCost= doMath(deliveryFee)
    firstRowMaker()
    content(deliveryCost)
}