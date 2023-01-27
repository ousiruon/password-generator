const upperCaseOnly = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerCaseOnly = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbersOnly = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbolsOnly = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let rangeInputValue = 18 ;
let generatedPsswd = '';
let charText = document.querySelector('.char');
let rangeInput = document.querySelector('#el-charNum');
let lowerCaseCheckbox = document.querySelector('#lowercase');
let upperCaseCheckbox = document.querySelector('#uppercase');
let numbersCheckbox = document.querySelector('#numbers');
let symbolsCheckbox = document.querySelector('#symbols');
let generatedPsswdText = document.querySelector('.generated-password');
let hiddenPsswdText = document.querySelector('.hidden-generated-password');
let refreshButton = document.querySelector('.retry');
let copyButton = document.querySelector('.copy');
let copiedText = document.querySelector('.copied');

generatePsswd (rangeInputValue);


    [rangeInput,lowerCaseCheckbox,upperCaseCheckbox,numbersCheckbox,symbolsCheckbox].forEach((element) => {
        element.addEventListener("change", function () {
            if (lowerCaseCheckbox.checked === true || upperCaseCheckbox.checked === true || numbersCheckbox.checked === true || symbolsCheckbox.checked === true ) {
                let rangeInputValue = rangeInput.value;
                generatePsswd(rangeInputValue);
                charText.textContent = rangeInputValue;
                let selectAllInputs = document.querySelectorAll('input[type="checkbox"]:checked');
                numChecked = selectAllInputs.length;
                onlyDisabledInput = document.querySelectorAll('input[type="checkbox"]:disabled');
                if (numChecked === 1) {
                    let onlySectedInput = document.querySelector('input[type="checkbox"]:checked');
                    onlySectedInput.setAttribute('disabled',true);
                }
                else if (numChecked !==1 && onlyDisabledInput.length >= 1) {
                    onlyDisabledInput.forEach(element => {
                        element.disabled = false;
                    });
                }    
            }
            else {
                alert('At least one option should be selected!');
            }
        });
    });


function generatePsswd (rangeInputValue) {
    let characters = [];
    if (lowerCaseCheckbox.checked === true ){
        characters = characters.concat(lowerCaseOnly);
    }
    if (upperCaseCheckbox.checked === true ){
        characters = characters.concat(upperCaseOnly);
    }
    if (numbersCheckbox.checked === true ){
        characters = characters.concat(numbersOnly);
    }
    if (symbolsCheckbox.checked === true ){
        characters = characters.concat(symbolsOnly);
    }
    generatedPsswd = '';
    charactersNumber = characters.length;
    for (let i = 0 ; i < rangeInputValue ; i++) {
        randomNumber = Math.floor(Math.random() * charactersNumber);
        generatedPsswd += characters[randomNumber];
    }
    checkedOptions ();
    if (rangeInputValue >= 20) {
        let shortenPsswdText = '';
        shortenPsswdText = generatedPsswd.slice(0,20) + '...';
        generatedPsswdText.textContent = shortenPsswdText;
    }
    else {
        generatedPsswdText.textContent = generatedPsswd;
    }
    hiddenPsswdText.textContent = generatedPsswd;
}

function containsNumbers(psswdCheck) {
    return /[0-9]/.test(psswdCheck);
}
function containsUppercase(psswdCheck) {
    return /[A-Z]/.test(psswdCheck);
}
function containsLowercase(psswdCheck) {
    return /[a-z]/.test(psswdCheck);
}
function containsSpecialChar(psswdCheck) {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(psswdCheck);
    console.log('Symbols');
}

function checkedOptions () {
    if (lowerCaseCheckbox.checked === true && containsLowercase(generatedPsswd) !== true){
        for ( let i = 0 ; i < lowerCaseOnly.length ; i++) {
            randomNumberNum = Math.floor(Math.random() * lowerCaseOnly.length);
        }
        generatedPsswd = generatedPsswd.substring(1);
        generatedPsswd += lowerCaseOnly[randomNumberNum];
    }
    if (upperCaseCheckbox.checked === true && containsUppercase(generatedPsswd) !== true){
        for ( let i = 0 ; i < upperCaseOnly.length ; i++) {
            randomNumberNum = Math.floor(Math.random() * upperCaseOnly.length);
        }
        generatedPsswd = generatedPsswd.substring(1);
        generatedPsswd += upperCaseOnly[randomNumberNum];
    }
    if (numbersCheckbox.checked === true && containsNumbers(generatedPsswd) !== true){
        for ( let i = 0 ; i < numbersOnly.length ; i++) {
            randomNumberNum = Math.floor(Math.random() * numbersOnly.length);
        }
        generatedPsswd = generatedPsswd.substring(1);
        generatedPsswd += numbersOnly[randomNumberNum];
    }
    if (symbolsCheckbox.checked === true && containsSpecialChar(generatedPsswd) !== true){
        for ( let i = 0 ; i < symbolsOnly.length ; i++) {
            randomNumberNum = Math.floor(Math.random() * symbolsOnly.length);
        }
        generatedPsswd = generatedPsswd.substring(1);
        generatedPsswd += symbolsOnly[randomNumberNum];
    }
}

refreshButton.addEventListener ("click", function () {
    if (lowerCaseCheckbox.checked === true || upperCaseCheckbox.checked === true || numbersCheckbox.checked === true || symbolsCheckbox.checked === true ) {
        let rangeInputValue = rangeInput.value;
        generatePsswd (rangeInputValue);
    }
    else {
        alert('At least one option should be selected!');
    }
});

copyButton.addEventListener ("click", function () {
    copiedText.classList.add('show');
    setTimeout (function () {
        copiedText.classList.remove('show');
    },1000);
    var inpPsswd =document.createElement('input');
    document.body.appendChild(inpPsswd);
    inpPsswd.value = generatedPsswd;
    inpPsswd.select();
    document.execCommand('copy',false);
    inpPsswd.remove();
});

