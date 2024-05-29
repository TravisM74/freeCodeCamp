const inputEl = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

const usValidRegex = /(1)?[\s]?(\(?[0-9][0-9][0-9]\)?)?[\s|-]?([0-9][0-9][0-9])[\s|-]?([0-9][0-9][0-9][0-9])/

const usFullRegex =  /(1)[\s]?(\(?[0-9][0-9][0-9]\)?)[\s|-]?([0-9][0-9][0-9])[\s|-]?([0-9][0-9][0-9][0-9])/
const usTenRegex = /(?=![0-9])(\(?[0-9][0-9][0-9]\)?)[\s|-]?([0-9][0-9][0-9])[\s|-]?([0-9][0-9][0-9][0-9])/

const nonUsFullRegex = /([0-9]?^1)[\s]?(\(?[0-9][0-9][0-9]\)?)[\s|-]?([0-9][0-9][0-9])[\s|-]?([0-9][0-9][0-9][0-9])/
const nonSevCodeRegex = /(?=![0-9])([0-9][0-9][0-9])[\s|-]?([0-9][0-9][0-9][0-9])/

const checkBtnClicked = () => {
    const value = inputEl.value;
    let newValue;
    if (value === '') {
        resultsDiv.textContent = "Please provide a phone number";
        alert('Please provide a phone number');
        return;
    }
    resultsDiv.textContent = `Invalid US number: ${inputEl.value}`;
    if ((value.includes('(') && !value.includes(')')) | (value.includes(')') && !value.includes('('))) {
        resultsDiv.textContent = `Invalid US number: ${inputEl.value}`;
        return;
    }
    // resultsDiv.textContent = usRegex.test(inputEl.value) ? `Valid US number: ${inputEl.value}` : `Invalid US number: ${inputEl.value}`
    const isFormated = usValidRegex.test(value) ? true : false;
    // checking a valid Full code 
    if (usFullRegex.test(value)){
        resultsDiv.textContent =`Valid US number: ${inputEl.value}`;
        console.log('usFullRegex');
        return;
    } 
    if (nonUsFullRegex.test(value)){
        resultsDiv.textContent =`Invalid US number: ${inputEl.value}`;
        console.log('nonUsFullRegex');
        return;
    }
    // checking a us 10 dig code
    if (usTenRegex.test(value)){
        resultsDiv.textContent =`Valid US number: ${inputEl.value}`;
        console.log('usTenRegex');
        return;
    }
    if (nonSevCodeRegex.test(value)){
        resultsDiv.textContent =`Invalid US number: ${inputEl.value}`;
        console.log('usSevCodeRegex');
        return;
    }
    /*

    console.log('is Formated',isFormated);
    if (value.includes('-')) {
        newValue = value.replace(/-/g,' ');
    }
    console.log(newValue);
    const numberArray = newValue.split(' ');
    if (numberArray.length === 5) {
        if (numberArray[0] !== 1) {
            resultsDiv.textContent = `Invalid US number: ${inputEl.value}`;
            return;
        }
    }
    if (numberArray.length === 4) {
        if (numberArray[0] !== 1) {
            resultsDiv.textContent = `Invalid US number: ${inputEl.value}`;
            return;
        }
    }
    if(numberArray.length === 2){
        if (numberArray[0] === 555){
            resultsDiv.textContent = `Invalid US number: ${inputEl.value}`;
            return;
        }
    }
    
    if (isFormated) {
        resultsDiv.textContent = `Valid US number: ${inputEl.value}`;
    }
    */
}
const clearBtnClicked = () =>{
    inputEl.value = '';
    resultsDiv.textContent = "";
}
checkBtn.addEventListener("click", checkBtnClicked);
clearBtn.addEventListener('click', clearBtnClicked);