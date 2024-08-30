import { Post, Delete, Put } from "./app.js";

const select = document.querySelector(".select");
const rigthBlock = document.querySelector(".rigthBlock");
const btnBasket = document.querySelector(".btnBasket");
const korzinadialog = document.querySelector(".korzinadialog");
const box = document.querySelector(".box");
const x = document.querySelector(".x");
const navbtn3 = document.querySelector(".navbtn3");
const baglength=document.querySelector(".baglength")

x.onclick = () => {
  korzinadialog.close();
};

btnBasket.onclick = () => {
  getkor();
  korzinadialog.showModal();
};

navbtn3.onclick = () => {
  arr.forEach((e) => {
    korzinkaarr = korzinkaarr.filter(item => item.id !== e.id);
    localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
    getkor();
  });
};

let arr = [];
let korzinkaarr = JSON.parse(localStorage.getItem("korzinka")) || [];

function getData(data) {
  rigthBlock.innerHTML = "";
  data.forEach((e) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = e.img;
    img.classList.add("imgbrend");

    const price = document.createElement("h3");
    price.textContent = `$${e.price}`;

    const name = document.createElement("h2");
    name.textContent = e.name;

    const btnadd = document.createElement("button");
    btnadd.textContent = "Add to Cart";
    btnadd.onclick = () => {
      let existingItem = korzinkaarr.find(item => item.id === e.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        let obj = {
          img: e.img,
          name: e.name,
          price: e.price,
          count: 1,
          id: e.id,
        };
        korzinkaarr.push(obj);
      }
      localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
      alert("Added to Cart");
    };

    const about = document.createElement("a");
    about.textContent = "About";
    about.href = "/aboutproduct/index.html";
    about.onclick = () => {
      localStorage.setItem("img", e.img);
      localStorage.setItem("name", e.name);
      localStorage.setItem("about", e.about);
      localStorage.setItem("price", e.price);
    };

    const btns = document.createElement("div");
    btns.classList.add("btns");
    btns.append(btnadd, about);
    about.classList.add("about");
    btnadd.classList.add("btnadd");

    card.append(img, name, price, btns);
    rigthBlock.appendChild(card);
  });
}

function getkor() {
  box.innerHTML = "";
  let total = 0;
  let ghghg=0;

  korzinkaarr.forEach((e, i) => {
    ghghg+=e.count;
    const card = document.createElement("div");
    card.classList.add("card");
    
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
  title.textContent = `Total: $${total}`;
}

export { getData, getkor, korzinadialog };
