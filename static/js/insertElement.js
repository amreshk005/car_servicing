import { elements } from "./queryHolder";

export const renderModel = (model, data) => {
  const modelAdder = `
    <option style="position:absolute; font-size: 1.2em;" value=${model}>${model}</option>
    `;
  if (data === "Model") {
    elements.modelElement.insertAdjacentHTML("beforeend", modelAdder);
  } else if (data === "Manufacturer") {
    elements.manufacturer.insertAdjacentHTML("beforeend", modelAdder);
  } else {
    elements.fuelElement.insertAdjacentHTML("beforeend", modelAdder);
  }
};
export const clearModeloptions = () => {
  // modelElement.parentElement.removeChild(modelElement);
  elements.modelElement.innerHTML = "";
  elements.fuelElement.innerHTML = "";
  const modelAdder = `
    <option value=""></option>
    `;
  elements.modelElement.insertAdjacentHTML("beforeend", modelAdder);
  elements.fuelElement.insertAdjacentHTML("beforeend", modelAdder);
};

export const buttonInsert = slug => {
  const button = `
  <a href="/package/${slug}" class="button" id="buttonNext">CHECK SERVICE</a> 
  `;
};

export const packageInsert = async packageData => {
  // var dataService;
  // packageData.services.map(x => {
  //   var dataService = `
  // <li>${x}</li>
  // `;
  // });
  // console.log("packageData.services: " + packageData.services);
  const data = `
    <div class="pricing-card">
    <span class="pricing-el-med">${packageData.packageType}</span>
    <h2>&#8377 ${packageData.price}</h2>
    <span class="pricing-el-small">Takes ${
      packageData.checkingTime
    } hours</span>
    <ul class="pricing-el-small" id="services">
     ${packageData.services.map(key => {
       return `<li>${key}</li>`;
     })}
    </ul>
    <a href="/booking" class="btn btn-pricing" id="proccedToBook">Procced to Book</a>
  </div>
  `;
  await elements.packageElement.insertAdjacentHTML("beforeend", data);
  const el = document.getElementById("proccedToBook");
  el.addEventListener("click", e => {
    localStorage.setItem("packageType", packageData.packageType);
    localStorage.setItem("price", packageData.price);
    localStorage.setItem("services", packageData.services);
  });
};
