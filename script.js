let randomNumber = null;
let tries = 0;
let history = [];

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
        addToHistory(tries, randomNumber);
        renderHistory();
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

    if (localStorage.getItem('history')) {
        history = JSON.parse(localStorage.getItem('history'));
        renderHistory();
    }

    randomNumber = parseInt(localStorage.getItem('randomNumber'), 10);
    tries = 0;
}

window.onbeforeunload = () => {
    localStorage.setItem('tries', tries);
    localStorage.setItem('history', JSON.stringify(history));
}

function innerError(insert) {
    return '<h2 style="color: red">Too ' + insert + '! Try Again.</h2>'
}

function makeRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function addToHistory(tries, randomNumber) {
    history.push({
        randomNumber: randomNumber,
        tries: tries,
        time: new Date().toTimeString(),
    });
}

function renderHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '<h2>Game History</h2>';

    history.forEach((entry, index) => {
        historyContainer.innerHTML += `<p>Game ${index + 1}: Guessed ${entry.randomNumber} in ${entry.tries} tries at ${entry.time}</p>`;
    });
}