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

export const packageInsert = async (packageData, count, countbookingId) => {
  let package_detail;
  if (packageData.packageType === "Basic") {
    package_detail = `
                <li>Air Filter - Cleaned</li>
                <li>Oil Filter - Replaced</li>
                <li>Engine Oil - Replaced</li>
                <li>Coolant    - Top up</li>
                <li>Fuel Filter/Disel Filter - NA</li>
                <li>Brake pads - NA</li>
                <li>Brake Fluids - NA</li>
                <li>Gear Oil - NA</li>
                <li>Wiper Fluid - Replaced</li>
                <li>Battery Water - Replaced</li>
                <li>Spark Plugs(P) - cleaned</li>
                <li>Cabin Filter/AC Filter - NA</li>
                <li>Tyre Rotation - NA</li>
                <li>Interior cabin cleaning - included</li>
                <li>Wheel Alignement and Balancing - NA</li>
                <li>Car Wash - NA</li>


    `;
  } else if (packageData.packageType === "Comprehensive") {
    package_detail = `
    <li>Air Filter - Replaced</li>
    <li>Oil Filter - Replaced</li>
    <li>Engine Oil - Replaced</li>
    <li>Coolant    - Top up</li>
    <li>Fuel Filter/Disel Filter - Replaced</li>
    <li>Brake pads - Serviced</li>
    <li>Brake Fluids - Replaced</li>
    <li>Gear Oil - Top up</li>
    <li>Wiper Fluid - Replaced</li>
    <li>Battery Water - Replaced</li>
    <li>Spark Plugs(P) - cleaned</li>
    <li>Cabin Filter/AC Filter - Cleaned</li>
    <li>Tyre Rotation - included</li>
    <li>Interior cabin cleaning - included</li>
    <li>Wheel Alignement and Balancing - included</li>
    <li>Car Wash - included</li>
    `;
  } else if (packageData.packageType === "Standard") {
    package_detail = `
    <li>Air Filter - Replaced</li>
    <li>Oil Filter - Replaced</li>
    <li>Engine Oil - Replaced</li>
    <li>Coolant    - Top up</li>
    <li>Fuel Filter/Disel Filter - Cleaned</li>
    <li>Brake pads - Serviced</li>
    <li>Brake Fluids - Top up</li>
    <li>Gear Oil - NA</li>
    <li>Wiper Fluid - Replaced</li>
    <li>Battery Water - Replaced</li>
    <li>Spark Plugs(P) - cleaned</li>
    <li>Cabin Filter/AC Filter - NA</li>
    <li>Tyre Rotation - included</li>
    <li>Interior cabin cleaning - included</li>
    <li>Wheel Alignement and Balancing - NA</li>
    <li>Car Wash - included</li>
`;
  }
  const data = `
  <div class="content__cardsection__card${count}">
            <div class="content__cardsection__card${count}__package">
              <h2>${packageData.packageType}</h2>
            </div>
            <div class="content__cardsection__card${count}__price">
              <h1>&#8377 ${packageData.price}</h1>
              <h2>Every 5,000kms / 3 months |</h2>
              <h2>1 months warranty</h2>
            </div>
            <div class="content__cardsection__card${count}__info">
              <ul>
              ${package_detail}
              </ul>
            </div>
            <a href="/booking" class="content__cardsection__card${count}__button" id="${packageData.packageType}${countbookingId}">
              <h2>Proceed to Book</h2>
            </a>
          </div>
  `;
  await elements.packageElement.insertAdjacentHTML("beforeend", data);

  // const el = document.getElementById("proccedToBook");
  // el.addEventListener("click", e => {
  //   localStorage.setItem("price", packageData.price);
  //   localStorage.setItem("packageType", packageData.packageType);
  // });
};
