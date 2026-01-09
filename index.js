async function loadCurrencyDropdown() {
    let currencies = await loadCurrencyJSON();
    const dropdowns = document.querySelectorAll(".currency-dropdown");
    
    dropdowns.forEach(selectElement => {
        selectElement.innerHTML = "";

        currencies.forEach(currency => {
            const option = document.createElement("option");

            option.innerText = `${currency.currency_code} - ${currency.currency_name}`;
            option.value = currency.currency_code;
            
            selectElement.appendChild(option);
        });
    });
}

async function loadCurrencyJSON() {
    const response = await fetch("./resources/currencies.json");
    return await response.json();
}

function submitForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const amount = formData.get("amount");
    const from = formData.get("from-currency");
    const to = formData.get("to-currency");

    if (from === to) {
        alert("You cannot convert to the same currency");
        return;
    }
    if (Number(amount) === 0) {
        alert("You cannot convert 0");
        return;
    }

    calculateResult();
    async function calculateResult() {
        const data = await convertCurrency(from);

        const rate = data.conversion_rates[to];
        const result = Number(amount) * rate;
        
        const resultHeader = document.getElementById("result").querySelector("h1");
        resultHeader.innerText = `${amount} ${from} is ${result.toFixed(2)} ${to}`;
        console.log(`Converted ${amount} ${from} to ${result.toFixed(2)} ${to}`)
    }
}

async function convertCurrency(from) {
    const API_KEY = CONFIG.API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;
    const result = await fetch(url);
    return await result.json();
}

document.addEventListener("DOMContentLoaded", () => {
    loadCurrencyDropdown();

    const form = document.getElementById("converter-form");
    form.onsubmit = submitForm;
});