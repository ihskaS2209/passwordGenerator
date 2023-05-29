const inputSlider = document.querySelector('[data-lengthSlider]'); // using custom attribute to fetch the slider element
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generate-btn');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
uppercaseCheck.checked = true;
// set strength circle color to grey

setIndicator('#ccc');

// set passwordLength 
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min) + "% 100%");
}


// set color and shadow of strength circle
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRandomInteger(min, max){
    return Math.floor(Math.random()*(max-min) + min); // gives an integer between min and max numbers
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123)); // ascii value a-->97, z-->123
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91)); // ascii value A-->65, Z-->91
}

function generateSymbols(){
    const randomNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randomNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator('#0f0');
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}

async function copyContent(){
    try{
        // to copy the password to the clipboard
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    }
    catch(e){
        copyMsg.innerText = "Failed to copy!";
    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    }, 2000);

}

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    // special condition
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function shufflePassword(array){
    // Fisher Yates Method --> shuffle an array
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((e)=> (str += e));
    return str;
}


generateBtn.addEventListener('click', ()=>{
    if(checkCount<=0){
        return;
    }
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("Stdjfhjd");
    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbols();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbols);
    }

    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log("conpulsory");
    console.log(password);

    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randomIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randomIndex]();
    }
    console.log(password);

    console.log("remaininhg add");
    // shuffle the password
    password = shufflePassword(Array.from(password));

    console.log("Shuffling done");
    // display password
    passwordDisplay.value = password;
    calcStrength();

});

console.log(generateLowerCase());
