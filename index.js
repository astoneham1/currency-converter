async function loadCurrencyDropdown() {
    const currencies = await loadCurrencyJSON();
    
    const dropdown = document.getElementById("currency-dropdown");
    dropdown.innerHTML = "";
    
    currencies.forEach(currency => {
        const option = document.createElement("option");
        
        option.innerText = `${currency.currency_code} - ${currency.currency_name}`;
        option.value = currency.currency_code;

        dropdown.appendChild(option);
    });
}

async function loadCurrencyJSON() {
    const response = await fetch("./currencies.json");
    return await response.json();
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Started");
    loadCurrencyDropdown().then(() => console.log("Loaded currencies"));
});