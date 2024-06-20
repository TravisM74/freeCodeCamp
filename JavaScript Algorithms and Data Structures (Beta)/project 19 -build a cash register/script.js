let price = 19.50;
let cid = [
    ["PENNY", .01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];
const amounts ={
    'ONE HUNDRED': 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE" : 1,
    "QUARTER" : 0.25,
    "DIME" : 0.10,
    "NICKEL" : 0.05,
    "PENNY" : 0.01,
}
let cash;
let status = 'OPEN';
let handedBack = {};

const outputDisplay = document.getElementById('change-due');
const itemCost = document.getElementById('item-cost');
const cashInInput = document.getElementById("cash");
const purchaseBtn = document.getElementById('purchase-btn');
const cashInDraw = document.getElementById('cash-in-draw'); 


itemCost.textContent = `$ ${price}`;

const displayCashDraw = () => {
    cashInDraw.innerHTML = '';
    cid.forEach(amount =>  {
        let string = amount[0].toLowerCase();
        string = string[0].toUpperCase() + string.substring(1);
        if (string.charAt(string.length -1) == 'y'){
            string = string.slice(0,-1);
            string +='ies';
        } else {
            string += 's';
        }
        cashInDraw.innerHTML += `<li>${string}: $${amount[1]}`
    });   
}
displayCashDraw();

const displayHandedBack = () =>{
    outputDisplay.innerHTML = `<div>Status: ${status}</div>`;
    console.log(handedBack);
    Object.entries(handedBack).forEach(([key, val]) =>{
        outputDisplay.innerHTML += `<div>${key}: $${val}</div>`;
    });
}

const calcDrawTotal = () => {
    return Number.parseFloat(cid.reduce((a,b) =>  a + b[1], 0)).toFixed(2) ;
}

const makePurchase = () => {
    const cashHanded = Number.parseFloat(cashInInput.value).toFixed(2);
    console.log('Cash handed :',cashHanded);
    if (cashHanded < price) {
        alert ('Customer does not have enough money to purchase the item')
        return;
    }
    if (cashHanded == price){
        outputDisplay.innerText = 'No change due - customer paid with exact cash';
        return;
    }
    const drawTotal = calcDrawTotal();
    console.log('draw total',drawTotal)
    if (cashHanded - price > drawTotal){
        status = 'INSUFFICIENT_FUNDS';
        outputDisplay.textContent = `Status: ${status}`;
        return;
    }
    const returnAmount = (cashHanded - price).toFixed(2);
    let currentAmount = returnAmount;
    console.log('Amount of change to return',returnAmount);
    status = 'OPEN'
    let count = 8
    Object.entries(amounts).forEach(([key, val]) =>{
        if ((currentAmount / val) >= 1 && cid[count][1] !== 0) {
            const notesNeeded = Math.floor(currentAmount / val);
            const notesInDraw = Math.floor(cid[count][1] / val);
            console.log(val,' notes needed : ',notesNeeded, "notes have :", notesInDraw);
            if (notesNeeded <= notesInDraw){
                currentAmount -= (val * notesNeeded);
                handedBack[key] = (val * notesNeeded);
                cid[count][1] -= (val * notesNeeded);
            } else {
                currentAmount -= cid[count][1];
                handedBack[key] = cid[count][1];
                cid[count][1] = 0;
            }
        }
        currentAmount = Number(currentAmount).toFixed(2);
        console.log('Current amout',currentAmount);
        count -= 1;
    });

    console.log (cashHanded, "  :  ", drawTotal);
    displayCashDraw();
    if (calcDrawTotal() == 0){
        status = 'CLOSED';
    }
    if (Number(currentAmount) !== 0 ) {
        status = 'INSUFFICIENT_FUNDS';
        Object.entries(handedBack).forEach(([key, val]) =>{
            cid[key] += val ;
        });
        handedBack = {};
    }
    displayHandedBack();


}
purchaseBtn.addEventListener('click', makePurchase);

/*
 if ((currentAmount / 100) > 1 && cid[8][1] !== 0) {
        const notesNeeded = Math.floor(currentAmount / 100);
        console.log('notes needed : ',notesNeeded);
        if (notesNeeded <= (currentAmount / 100)){
            currentAmount -= 100 * notesNeeded;
            handedBack['Hundred'] = (100 * notesNeeded).toFixed(2);
            cid[8][1] -= 100 * notesNeeded;
        } else {
            currentAmount -= cid[8][1];
            handedBack['Hundred'] = (cid[8][1]);
            cid[8][1] = 0;
        }
    }
    if ((currentAmount / 20) > 1 && cid[7][1] !== 0) {
        const notesNeeded = Math.floor(currentAmount / 20);
        console.log('notes needed : ',notesNeeded);
        if (notesNeeded <= (currentAmount / 20)){
            currentAmount -= 20 * notesNeeded;
            handedBack['TWENTY'] = (20 * notesNeeded).toFixed(2);
            cid[7][1] -= 20 * notesNeeded;
        } else {
            currentAmount -= cid[7][1];
            handedBack['TWENTY'] = (cid[7][1]);
            cid[7][1] = 0;
        }
    }
    if ((currentAmount / 10) > 1 && cid[6][1] !== 0) {
        const notesNeeded = Math.floor(currentAmount / 10);
        console.log('notes needed : ',notesNeeded);
        if (notesNeeded <= (currentAmount / 10)){
            currentAmount -= 10 * notesNeeded;
            handedBack['TEN'] = (10 * notesNeeded).toFixed(2);
            cid[6][1] -= 10 * notesNeeded;
        } else {
            currentAmount -= cid[6][1];
            handedBack['TEN'] = (cid[6][1]);
            cid[6][1] = 0;
        }
    }
    if ((currentAmount / 5) > 1 && cid[5][1] !== 0) {
        const notesNeeded = Math.floor(currentAmount / 5);
        console.log('notes needed : ',notesNeeded);
        if (notesNeeded <= (currentAmount / 5)){
            currentAmount -= 5 * notesNeeded;
            handedBack['FIVE'] = (5 * notesNeeded).toFixed(2);
            cid[5][1] -= 5 * notesNeeded;
        } else {
            currentAmount -= cid[5][1];
            handedBack['FIVE'] = (cid[5][1]);
            cid[5][1] = 0;
        }
    }

*/
