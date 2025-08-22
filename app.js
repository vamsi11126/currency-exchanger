import { countryList } from "./codes.js"

const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"

const dropDowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
for (let select of dropDowns){
  for (let currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerHTML=currCode;
    newOption.value=currCode
    if (select.name==="from" && currCode==="USD"){
      newOption.selected="selected"
    }
    else if (select.name==="to" && currCode==="INR"){
      newOption.selected="selected"
    }
    select.append(newOption)

  }
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target)
    });
  
}
const  updateFlag=(element)=> {
  let currCode=element.value
  let countrycode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;

}

button.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtVal=amount.value;
  if (amtVal==="" || amtVal<0){
    alert("please enter vaild input")
  }

  const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response=await fetch(URL);
  let data =await response.json()
  let rate=(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()])
  let value=amtVal*rate;
  document.querySelector(".msg").innerHTML=`${amtVal}${fromCurr.value}=${(value).toFixed(2)}${toCurr.value}`
})