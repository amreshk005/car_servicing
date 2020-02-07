import "@babel/polyfill";
import Models, { booking } from "./overview";
import { elements } from "./queryHolder";
import { renderModel, clearModeloptions, packageInsert } from "./insertElement";

(async function() {
  const state = {};
  var dataholder;
  let count = 0;
  let ManufacturerHolder = [];
  state.search = new Models();
  await state.search.getresults();
  dataholder = state.search.results.data.manufacturers;

  if (window.location.href === `http://127.0.0.1:3000/`) {
    localStorage.clear();
    window.onload = function() {
      for (var i = 0; i < dataholder.length; i++) {
        ManufacturerHolder.push(dataholder[i].CarMake);
      }
      ManufacturerHolder = [...new this.Set(ManufacturerHolder)];
      ManufacturerHolder.map(x => {
        renderModel(x, "Manufacturer");
      });
      console.log(window.location.href);
    };
    elements.manufacturer.addEventListener("change", async e => {
      clearModeloptions();
      let ModelHolder = [];
      let fuelHolder = [];

      for (var i = 0; i < dataholder.length; i++) {
        if (dataholder[i].CarMake === e.target.value) {
          // renderModel(dataholder[i].Model, "Model");
          ModelHolder.push(dataholder[i].Model);
          if (fuelHolder.length == 0 || fuelHolder.includes(fuelHolder))
            fuelHolder.push(dataholder[i].fuelType);
        }
      }
      ModelHolder.filter((ele, indx) => indx === ModelHolder.indexOf(ele));

      ModelHolder.map(x => {
        renderModel(x, "Model");
      });
      fuelHolder.map(x => {
        renderModel(x, "fuelType");
      });
    });
    elements.modelElement.addEventListener("change", e => {
      // console.log(e);
      localStorage.setItem("slug", `${e.target.value}`);

      elements.buttonElement.setAttribute("href", `/package/${e.target.value}`);
      console.log(localStorage.getItem("slug"));
    });
  }

  //packasges insertion
  const getarrayedpackages = arrayOfpackages => {
    for (let arrayOfpackage of arrayOfpackages) {
      packageInsert(arrayOfpackage);
    }
  };
  document.onload = (function() {
    console.log(`yeah i'm here bro! new`);
    if (
      window.location.href ==
      `http://127.0.0.1:3000/package/${localStorage.getItem("slug")}`
    ) {
      console.log(`yeah i'm here bro!`);
      if (window.location.href) {
        // console.log(localStorage.getItem("slug"));
        for (var i = 0; i < dataholder.length; i++) {
          if (dataholder[i].Model === localStorage.getItem("slug")) {
            getarrayedpackages(dataholder[i].packages);
            console.log(dataholder[i]);
            localStorage.setItem("dataholderforemail", dataholder[i]);
          }
        }
      }
    }

    if (elements.formElement) {
      let packageType = localStorage.getItem("packageType");
      let slugholder = localStorage.getItem("slug");
      let price = localStorage.getItem("price");
      let services = localStorage.getItem("services");
      console.log(packageType, slugholder, price, services);
      if (localStorage.getItem("slug") && localStorage.getItem("packageType")) {
        elements.formElement.addEventListener("submit", e => {
          e.preventDefault();
          let name = document.getElementById("name").value;
          let email = document.getElementById("email").value;
          let phone = document.getElementById("phone").value;
          let pickupLocation = document.getElementById("pickupLocation").value;
          let pinCode = document.getElementById("pinCode").value;
          booking(
            name,
            email,
            phone,
            pickupLocation,
            pinCode,
            slugholder,
            packageType,
            price,
            services
          );
        });
        console.log(localStorage.getItem("packageType"));
        console.log(localStorage.getItem("slug"));
      } else {
        document.getElementById("name").disabled = true;
        document.getElementById("email").disabled = true;
        document.getElementById("phone").disabled = true;
        document.getElementById("pickupLocation").disabled = true;
        document.getElementById("pinCode").disabled = true;
        elements.buttonSubmitElement.disabled = true;
        alert("procced from inital and please select Model");
      }
    }
  })();
})();
