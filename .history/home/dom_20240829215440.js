const block1=document.querySelector(".block1")
const navbtn3=document.querySelector(".navbtn3")
const pass=document.querySelector(".pass")
const dialog=document.querySelector(".dialog")
const show=document.querySelector(".show")
const ok=document.querySelector(".ok")
const asa=document.querySelector(".asa")
const passclose=document.querySelector(".passclose")

passclose.onclick=()=>{
  dialog.close()
}


show.onclick=()=>{
  dialog.showModal()
  asa.onclick=()=>{
    if(pass.value==atob(passsword)){
      ok.showModal()
      dialog.close()
    }
    else{
    alert("kusiocha")
    pass.value=""
  }
}
}
let passsword="ODA5OQ=="

navbtn3.onclick=()=>{
  arr.forEach((e)=>{
        korzinkaarr = korzinkaarr.filter(item => item.id == e.id);
        localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
        getkor(); 
      })
    }

import { Delete,put } from "./api.js";
function getData(data) {
    data.forEach((e,i) => {
     
      
       if(i==0|| i==1||i==2){
          const card=document.createElement("div")
       card.classList.add("card")
       const img=document.createElement("img")
       img.src=e.img
       img.classList.add("imgbrend")
       const price=document.createElement("h3")
       price.textContent=`$${e.price}`
       const name=document.createElement("h2")
       name.textContent=e.name
       card.append(img,name,price)
       block1.appendChild(card)
       };
    });
}
const btnBasket = document.querySelector(".btnBasket");
const korzinadialog = document.querySelector(".korzinadialog");
const box = document.querySelector(".box");
const x=document.querySelector(".x");

let idx=null
let idx2=null
let arr=[]
let count=null
x.onclick = () => {
  korzinadialog.close();
};
btnBasket.onclick = () => {
  korzinadialog.showModal();
};
let pri
let cnt=0
let korzinkaarr = JSON.parse(localStorage.getItem("korzinka"));

function getkor() {
  box.innerHTML = "";
  let total = 0;

  korzinkaarr.forEach((e, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    arr.push(e.id)
    const img = document.createElement("img");
    img.src = e.img;
    img.classList.add("imgbrend");

    const price = document.createElement("h3");
    price.textContent = `$${e.price}`;

    const name = document.createElement("h2");
    name.textContent = e.name;

    total += e.price * e.count;

    const btndelete = document.createElement("button");
    btndelete.textContent = "x";
    btndelete.onclick = () => {
      korzinkaarr = korzinkaarr.filter(item => item.id !== e.id);
      localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
      getkor(); 
    };
    btndelete.classList.add("delete");

    const div = document.createElement("div");
    const btnmax = document.createElement("button");
    btnmax.innerHTML = "+";
    btnmax.onclick = () => {
      e.count += 1;
      localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
      getkor(); 
    };

    const btnmin = document.createElement("button");
    btnmin.innerHTML = "-";
    btnmin.onclick = () => {
      if (e.count > 1) {
        e.count -= 1;
      } else {
        korzinkaarr = korzinkaarr.filter(item => item.id !== e.id);
      }
      localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
      getkor(); 
    };

    const coun = document.createElement("h3");
    coun.textContent = e.count;

    div.append(btnmax, coun, btnmin);
    div.classList.add("divcount");

    card.append(img, name, price, btndelete, div);
    box.appendChild(card);
  });

  const title = document.querySelector(".title");
  title.textContent = `${total}`;
}
export{getData,getkor}