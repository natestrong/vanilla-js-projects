const EXCHANGE_RATE_BASE_API = 'https://api.exchangerate-api.com/v4/latest/';

const currencyOneEl = document.getElementById('currency-one');
const currencyAmountOneEl = document.getElementById('amount-one');
const currencyTwoEl = document.getElementById('currency-two');
const currencyAmountTwoEl = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');

currencyOneEl.addEventListener('change', calculate);
currencyAmountOneEl.addEventListener('input', calculate);
currencyTwoEl.addEventListener('change', calculate);
currencyAmountTwoEl.addEventListener('input', calculate);

swapEl.addEventListener('click', onSwapElClick);

async function calculate() {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;

    let convertedRate;
    try {
        const req = await fetch(`${EXCHANGE_RATE_BASE_API}${currencyOne}`);
        const json = await req.json();
        convertedRate = json['rates'][currencyTwo];
    } catch (e) {
        throw new Error('Couldn\'t fetch exchange rate.');
    }

    rateEl.innerText = `1 ${currencyOne} = ${convertedRate} ${currencyTwo}`;

    currencyAmountTwoEl.value = (convertedRate * currencyAmountOneEl.value).toFixed(2);
}

function onSwapElClick() {
    const temp = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = temp;
    calculate();
}

calculate();
