import { Post,Delete,put } from "./api.js";
const rigthBlock = document.querySelector(".rigthBlock");
const EditDialog = document.querySelector(".EditDialog");
const editForm = document.querySelector(".editForm");
const close=document.querySelector(".close");
const AddDialog = document.querySelector(".AddDialog");
const AddForm = document.querySelector(".AddForm");
const btnAdd=document.querySelector(".btnAdd");
const edclose=document.querySelector(".edclose");

// const navbtn3=document.querySelector(".navbtn3")
// navbtn3.onclick=()=>{
//   arr.forEach((e)=>{
//     Delete(e)
//   })
// }

let idx=null
let idx2=null
let arr=[]
let arrselect=[]
let count=null

close.onclick=()=>{
    EditDialog.close()
}
edclose.onclick=()=>{
  AddDialog.close()
}

btnAdd.onclick=()=>{
  AddDialog.showModal()
}
AddForm.onsubmit=(event)=>{
  event.preventDefault()
  let obj = {
     img:   AddForm["Addimg"].value,
     name:  AddForm["Addname"].value,
     price: AddForm["Addprice"].value,
     brend: AddForm["Addbrend"].value,
     about: AddForm["Addabout"].value,
    };
    Post(obj);
    AddDialog.close()
    AddForm["Addimg"].value=""
      AddForm["Addname"].value=""
     AddForm["Addprice"].value=""
     AddForm["Addbrend"].value=""
     AddForm["Addabout"].value=""
   
}
editForm.onsubmit=(event)=>{
    event.preventDefault()
    let obj1 = {
       img:   editForm["img"].value,
       name:  editForm["name"].value,
       price: editForm["price"].value,
       brend: editForm["brend"].value,
       about: editForm["about"].value,
      };
      put(obj1,idx2);
      EditDialog.close()
    }
    
    function getData(data) {
  rigthBlock.innerHTML=""
  data.forEach((e, i) => {
      const card = document.createElement("div");
      card.classList.add("card");
      arrselect.push(e.brend)
    
      const img = document.createElement("img");
      img.src = e.img;
      img.classList.add("imgbrend");
      const price = document.createElement("h3");
    price.textContent = `$${e.price}`;
    const name = document.createElement("h2");
    name.textContent = e.name;
    const btnput = document.createElement("button");
    btnput.textContent = "Edit";
    btnput.onclick = () => {
        EditDialog.showModal()
        editForm["img"].value=e.img
         editForm["name"].value= e.name
         editForm["price"].value= e.price
         editForm["brend"].value= e.brend
         editForm["about"].value= e.about
         console.log(editForm["img"].value=e.img);
         idx2=e.id
    };
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "delete";
    btnDelete.onclick = () => {
     Delete(e.id)
    }
    const btns = document.createElement("div");
    btns.classList.add("btns");
    btns.append(btnput, btnDelete);
    btnDelete.classList.add("about");
    btnput.classList.add("btnadd");
    card.append(img, name, price, btns);
    rigthBlock.appendChild(card);
  });
  const select=document.querySelector(".select")
  arrselect.forEach((e)=>{
    const option = document.createElement("option");
      console.log();console.log(e);
      option.textContent = e;
      select.appendChild(option);
    
  })
}

export { getData };
// console.log(localStorage.getItem(JSON.stringify("e")));
