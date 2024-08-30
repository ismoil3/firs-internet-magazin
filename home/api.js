const Api = "https://66cff4e3181d059277dcbee9.mockapi.io/cardusers";
const Api2 = "https://66cff4e3181d059277dcbee9.mockapi.io/korzin";
import { getData,getkor } from "./dom.js";

async function Get() {
  try {
    const { data } = await axios.get(Api);
    getData(data);
  } catch (error) {
    console.log(error);
  }
}

async function get() {
  try {
    const { data } = await axios.get(Api2);
    getkor(data);
  } catch (error) {
    console.log(error);
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
async function put(obj,id) {
  try {
    const { data } = await axios.put(`${Api2}/${id}`, obj);
    get()
  } catch (error) {
    
  }
}
export { Get ,Post,get,Delete,put};
