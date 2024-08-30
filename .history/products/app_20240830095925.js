  const Api = "https://66cff4e3181d059277dcbee9.mockapi.io/cardusers";
  const Api2 = "https://66cff4e3181d059277dcbee9.mockapi.io/korzin";
  const search=document.querySelector(".search");
  const priceSlider = document.getElementById('price-slider');
  const priceValue = document.getElementById('price-value');
  const select=document.querySelector(".select")
  const baglength=document.querySelector(".baglength")
  let x='',y=1000,z='';

  import { korzinadialog } from "./dom.js";

  priceSlider.oninput=(e)=> {
      priceValue.innerHTML = e.target.value;
      y=e.target.value;
      Get();
  };
  select.onclick=(e)=>{
    if(e.target.value!='All')z=e.target.value;
    else z='';
    Get();
  }

  search.oninput=(e)=>{
    x=e.target.value.toLowerCase().trim();
    Get();
  }

  import { getData,getkor } from "./dom.js";
  async function Get() {
    try {
      const { data } = await axios.get(Api);
      getData(data.filter((e)=>e.name.toLowerCase().includes(x) && +e.price<=y &&  e.brend.includes(z)));
    } catch (error) {
      console.log(error);
    }
  }

  async function getKor() {
    try {
      const { data } = await axios.get(Api);
      let st = new Set();
      st.add("All");
      data.forEach((e) => st.add(e.brend));
      select.innerHTML = "";
      st.forEach((e,i)=>{
        const option = document.createElement('option');
        option.value=e;
        option.innerHTML=e;
        select.appendChild(option);
      })
    } catch (error) {
      console.error(error);
    }
  }


  async function get() {
    try {
      const { data } = await axios.get(Api2);
      getkor(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function Post(obj) {
    try {
      const { data } = await axios.post(Api2, obj);
      Get();
    } catch (error) {
      console.log(error);
    }
  }
  async function Delete(idx){

    try {
      await axios.delete(`${Api2}/${idx}`);
      korzinadialog.showModal()
      Get();
    } catch (error) {
      console.log(error);
    }
  }
  async function Put(obj,id) {
    try {
      const { data } = await axios.put(`${Api2}/${id}`, obj);
      get()
    } catch (error) {
      
    }
  }
  export { Get ,Post,get,Delete,Put,getKor};
