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
  <a href="/package/${slug}" class="content__formsection__formplace__form__button" id="buttonNext">CHECK SERVICE</a> 
  `;
  elements.formElement.insertAdjacentHTML("beforeend", button);
};

export const packageInsert = async (packageData, count) => {
  const data = `
    <div class="pricing-card">
    <span class="pricing-el-med" id="${packageData.packageType}">${packageData.packageType}</span>
    <h2>&#8377 ${packageData.price}</h2>
   
    <ul class="pricing-el-small" id="services">
     <li>wheel chair</li>
    </ul>
    <a href="/booking" class="btn btn-pricing" value="${packageData.packageType}" id="${packageData.packageType}${count}" >Procced to Book</a>
  </div>
  `;
  await elements.packageElement.insertAdjacentHTML("beforeend", data);

  // const el = document.getElementById("proccedToBook");
  // el.addEventListener("click", e => {
  //   localStorage.setItem("price", packageData.price);
  //   localStorage.setItem("packageType", packageData.packageType);
  // });
};
