let randomNumber = null;
let tries = 0;

const output = document.getElementById('result');
const button = document.getElementById('guess-button');

button.addEventListener('click', () => {
    const input = document.getElementById('guess-input').value;

    if (input > 100 || input < 0 || isNaN(input) || input === '') {
        output.innerHTML = '<h2>Please enter a valid number between 0 and 100.</h2>';
        return;
    }

    if (input > randomNumber) {
        output.innerHTML = innerError('High');
        tries++;
    } else if (input < randomNumber) {
        output.innerHTML = innerError('Low');
        tries++;
    } else {
        output.innerHTML = `<h2 style="color: green">Congratulations! You've guessed the number ${randomNumber} in ${tries} tries.</h2>`;
        localStorage.removeItem('randomNumber');
        tries = 0
    }
});

window.onload = () => {
    if (!localStorage.getItem('randomNumber')) {
        const randomNum = makeRandomNumber(100);
        console.log('Generated Random Number:', randomNum);
        localStorage.setItem('randomNumber', randomNum);
    }

    if (!localStorage.getItem('tries')) {
        localStorage.setItem('tries', 0);
    }

    randomNumber = parseInt(localStorage.getItem('randomNumber'), 10);
    tries = 0;
}

window.onbeforeunload = () => {
    localStorage.setItem('tries', tries);
}

function innerError(insert) {
    return '<h2 style="color: red">Too ' + insert + '! Try Again.</h2>'
}

function makeRandomNumber(max) {
    return Math.floor(Math.random() * max);
}