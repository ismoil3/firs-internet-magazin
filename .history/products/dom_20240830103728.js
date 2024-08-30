import { Post, Delete, Put } from "./app.js";

const select = document.querySelector(".select");
const rightBlock = document.querySelector(".rightBlock");
const btnBasket = document.querySelector(".btnBasket");
const korzinadialog = document.querySelector(".korzinadialog");
const box = document.querySelector(".box");
const x = document.querySelector(".x");
const navbtn3 = document.querySelector(".navbtn3");
const baglength = document.querySelector(".baglength");

x.onclick = () => {
  korzinadialog.close();
};

btnBasket.onclick = () => {
  updateCart();
  korzinadialog.showModal();
};

navbtn3.onclick = () => {
  cartItems.forEach((e) => {
    cartItems = cartItems.filter(item => item.id !== e.id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCart();
  });
};

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function getData(data) {
  rightBlock.innerHTML = "";
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

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Add to Cart";
    btnAdd.onclick = () => {
      addToCart(e);
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
    btns.append(btnAdd, about);
    about.classList.add("about");
    btnAdd.classList.add("btnadd");

    card.append(img, name, price, btns);
    rightBlock.appendChild(card);
  });
}

function addToCart(item) {
  let existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.count += 1;
  } else {
    let obj = {
      img: item.img,
      name: item.name,
      price: item.price,
      count: 1,
      id: item.id,
    };
    cartItems.push(obj);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCart();
}

function updateCart() {
  box.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cartItems.forEach((e, i) => {
    totalItems += e.count;
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

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "x";
    btnDelete.onclick = () => {
      cartItems = cartItems.filter(item => item.id !== e.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    };
    btnDelete.classList.add("delete");

    const div = document.createElement("div");
    const btnMax = document.createElement("button");
    btnMax.innerHTML = "+";
    btnMax.onclick = () => {
      e.count += 1;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    };

    const btnMin = document.createElement("button");
    btnMin.innerHTML = "-";
    btnMin.onclick = () => {
      if (e.count > 1) {
        e.count -= 1;
      } else {
        cartItems = cartItems.filter(item => item.id !== e.id);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    };
    btnMin.disabled = e.count === 1;

    const count = document.createElement("h3");
    count.textContent = e.count;

    div.append(btnMax, count, btnMin);
    div.classList.add("divcount");

    card.append(img, name, price, btnDelete, div);
    box.appendChild(card);
  });

  const title = document.querySelector(".title");
  title.textContent = `Total: $${total}`;
  baglength.innerHTML = totalItems;
}

export { getData, updateCart, korzinadialog };

document.addEventListener("DOMContentLoaded", updateCart);
