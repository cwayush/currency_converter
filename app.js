const Base_url ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('button');
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.To select')
const msg =document.querySelector('.msg')


// for (let code in countryList){
//     console.log(code)
// }

for (let select of dropDowns){
    for (currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode==='USD'){
            newOption.selected ='selected';
        }else if (select.name === 'To' && currCode==='INR'){
            newOption.selected ='selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

}

btn.addEventListener('click', (event)=>{
    event.preventDefault();
    updateExchangerate();
})
                            
const updateExchangerate = async()=>{
    let amount = document.querySelector('.amount input');
    let amountValue =amount.value;
    if (amountValue === "" || amountValue<1){
        amountValue =1;
        amount.value ='1';
    }
    console.log(amountValue);

    let url =  `${Base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response =await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amountValue*rate;
    console.log(finalAmount)

    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}

window.addEventListener('load',()=>{
    updateExchangerate();
})