const img = document.querySelector(".img");
const about = document.querySelector(".about");
const navbtn3=document.querySelector(".navbtn3")
const baglength=document.querySelector(".baglength")

navbtn3.onclick=()=>{
  arr.forEach((e)=>{
    console.log(e);
    korzinkaarr = korzinkaarr.filter(item => item.id == e.id);
    localStorage.setItem("korzinka", JSON.stringify(korzinkaarr));
    getkor(); 
  })
}
let e = localStorage.getItem("e");
let img2 = localStorage.getItem("img");
let name = localStorage.getItem("name");
let price = localStorage.getItem("price");
let aboute = localStorage.getItem("about");
const img1 = document.createElement("img");
img1.alt = name;
img1.src = img2;
const about1 = document.createElement("p");
about1.textContent = aboute;
const name1 = document.createElement("h1");
name1.textContent = name;
const price1 = document.createElement("h2");
price1.textContent = "Price:  " + price;
const btnadd = document.createElement("a");
btnadd.textContent = "back to products";
btnadd.href = "/products/imdex.html";
btnadd.classList.add("navbtn1")

about.append(name1, price1, about1, btnadd);
img.appendChild(img1);

const added=document.querySelector(".added")
added.innerHTML=localStorage.getItem("name")

console.log(localStorage.getItem("added"));

const rigthBlock = document.querySelector(".rigthBlock");
const btnBasket = document.querySelector(".btnBasket");
const korzinadialog = document.querySelector(".korzinadialog");
const box = document.querySelector(".box");
const x=document.querySelector(".x");
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');



// let idx=null
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


// let korzinkaarr = JSON.parse(localStorage.getItem("korzinka"));





let korzinkaarr = JSON.parse(localStorage.getItem("korzinka"));

function getkor() {
  box.innerHTML = "";
  let total = 0;
  let ghghg=0;


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
  title.textContent = `Total: $${total}`;
}







const Api = "https://66cff4e3181d059277dcbee9.mockapi.io/cardusers";
const Api2 = "https://66cff4e3181d059277dcbee9.mockapi.io/korzin";

async function get() {
  try {
    const { data } = await axios.get(Api2);
    getkor(data);
  } catch (error) {
    console.log(error);
  }
}
console.log(korzinkaarr);
async function Delete(id){

  try {
    await axios.delete(`${korzinkaarr}/${id}`);
    get();
  } catch (error) {
    console.log(error);
  }
}
async function put(obj,id) {
  try {
    const { data } = await axios.put(`${Api2}/${id}`, obj);
    get()
  } catch (error) {
    
  }
}
get()


