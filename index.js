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

document.addEventListener("DOMContentLoaded", () => {
    console.log("Started");
    loadCurrencyDropdown().then(() => console.log("Loaded currencies"));
});