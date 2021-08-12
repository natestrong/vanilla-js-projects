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

async function calculate() {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;
    console.log(currencyOne, currencyTwo);

    let convertedRate;
    try {
        const req = await fetch(`${EXCHANGE_RATE_BASE_API}${currencyOne}`);
        const json = await req.json();
        console.log(json);
        convertedRate = json['rates'][currencyTwo];
    } catch (e) {
        throw new Error('Couldn\'t fetch exchange rate.');
    }

    rateEl.innerText = `1 ${currencyOne} = ${convertedRate} ${currencyTwo}`

    currencyAmountTwoEl.value = convertedRate * currencyAmountOneEl.value;
}

calculate();
