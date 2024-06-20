const dataInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
let isError = false;


const testNumber = (val) => {
    if(val.length < 1) {
        console.log('no Value');
        output.textContent = 'Please enter a valid number'; 
        isError = true;    
    }  
    let num = parseInt(val);
    console.log('Number :' ,num);
    if (num <= 0) {
        console.log('num less then 0');
        output.textContent = 'Please enter a number greater than or equal to 1';
        isError= true;
    }  
    if (num >= 4000) {
        output.textContent = 'Please enter a number less than or equal to 3999';
        isError = true;
    } 
    return num;
}

const createRomanNumeral = (num) => {
    let outString = '';
    let number = Math.floor(num);
    let multi =  Math.floor(number / 1000);
    if (multi >= 1) {
        outString += 'M'.repeat(multi);
        number -= multi * 1000;
    }
    multi = Math.floor(number / 900);
    if (multi >= 1){
        outString += 'CM'.repeat(multi);
        number -= multi * 900;
    }
    multi = Math.floor(number / 500);
    if (multi >= 1){
        outString += 'D'.repeat(multi);
        number -= (multi * 500);
        console.log('remaining:' ,number, ' multi  ',multi);
    }
    multi = Math.floor(number / 400);
    if (multi >= 1){
        outString += 'CD'.repeat(multi);
        number -= multi * 400;
    }
    multi = Math.floor(number / 100);
    if (multi >= 1){
        outString += 'C'.repeat(multi);
        number -= multi * 100;
    }
    multi = Math.floor(number / 90);
    if (multi >= 1){
        outString += 'XC'.repeat(multi);
        number -= multi * 90;
    }
    multi = Math.floor(number / 50);
    if (multi >= 1){
        outString += 'L'.repeat(multi);
        number -= multi * 50;
    }
    multi = Math.floor(number / 40);
    if (multi >= 1){
        outString += 'XL'.repeat(multi);
        number -= multi * 40;
    }
    multi = Math.floor(number / 10);
    if (multi >= 1){
        outString += 'X'.repeat(multi);
        number -= multi * 10;
    }
    multi = Math.floor(number / 9);
    if (multi >= 1){
        outString += 'IX'.repeat(multi);
        number -= multi * 9;
    }
    multi = Math.floor(number / 5);
    if (multi >= 1){
        outString += 'V'.repeat(multi);
        number -= multi * 5;
    }
    multi = Math.floor(number / 4);
    if (multi >= 1){
        outString += 'IV'.repeat(multi);
        number -= multi * 4;
    }
    multi = Math.floor(number / 1);
    if (multi >= 1){
        outString += 'I'.repeat(multi);
        number -= multi * 1;
    }
    return outString;
}

const convertClicked = () => {
    const number = testNumber(dataInput.value);
    if (isError) {
        isError = false;
    } else {     
        console.log('Data Input value',dataInput.value);
        output.textContent = createRomanNumeral(number);
    }
}

convertBtn.addEventListener('click', convertClicked);