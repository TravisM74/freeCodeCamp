const inputText = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultDisplay = document.getElementById("result");


const checkPalin = ()=> {
    const inString = inputText.value;
    const onlyLettersString = inString.toLowerCase().replace(/[^a-z0-9]/gm,"");
    const stringReversed = onlyLettersString.split('').reverse().join('');
    const isPalin = onlyLettersString === stringReversed ? true : false;
    
    displayResult(inString, isPalin);
}

const displayResult = (text,isPalin) => {
    if (text.length > 0){
        let outHTML = `<strong>${text}</strong>`;
        if (isPalin) {
            outHTML +=` is a palindrome.`
        } else {
            outHTML +=` is not a palindrome.`
        }
        resultDisplay.innerHTML = outHTML;
    } else {
        alert("Enter a value !");
    }
}

checkButton.addEventListener('click', checkPalin);