import "@babel/polyfill";
import Models, { booking } from "./overview";
import { elements } from "./queryHolder";
import {
  renderModel,
  clearModeloptions,
  packageInsert,
  buttonInsert
} from "./insertElement";

// import cons from "consolidate";

window.onload = function() {
  (async function() {
    const state = {};
    var dataholder;
    let ManufacturerHolder = [];
    state.search = new Models();
    await state.search.getresults();
    dataholder = state.search.results.data.manufacturers;

    // For Index page

    if (elements.indexElement) {
      localStorage.clear();

      document.onload = (async function() {
        for (var i = 0; i < dataholder.length; i++) {
          if (
            ManufacturerHolder.length == 0 ||
            !ManufacturerHolder.includes(dataholder[i].CarMake)
          )
            await ManufacturerHolder.push(dataholder[i].CarMake);
        }

        // ManufacturerHolder = [...new this.Set(ManufacturerHolder)];
        ManufacturerHolder.map(x => {
          renderModel(x, "Manufacturer");
        });
      })();

      // };

      // For Model in Index page

      elements.manufacturer.addEventListener("change", async e => {
        localStorage.removeItem("slug");
        localStorage.removeItem("fuelType");
        // elements.fuelElement.innerHTML = "";
        clearModeloptions();
        let ModelHolder = [];

        for (var i = 0; i < dataholder.length; i++) {
          if (dataholder[i].CarMake === e.target.value) {
            // renderModel(dataholder[i].Model, "Model");
            if (
              ModelHolder.length == 0 ||
              !ModelHolder.includes(dataholder[i].Model)
            )
              ModelHolder.push(dataholder[i].Model);
          }
        }
        ModelHolder.map(x => {
          renderModel(x, "Model");
        });
      });

      // For check service button in index page

      elements.modelElement.addEventListener("change", async e => {
        localStorage.removeItem("slug");
        localStorage.removeItem("fuelType");

        elements.fuelElement.innerHTML = "";
        const fuelAdder = `
        <option value=""></option>
        `;
        elements.fuelElement.insertAdjacentHTML("beforeend", fuelAdder);
        let fuelHolder = [];
        var opt = elements.modelElement[elements.modelElement.selectedIndex];
        for (var i = 0; i < dataholder.length; i++) {
          if (dataholder[i].Model === opt.text) {
            if (
              fuelHolder.length == 0 ||
              !fuelHolder.includes(dataholder[i].fuelType)
            ) {
              fuelHolder.push(dataholder[i].fuelType);
            }
          }
        }
        await fuelHolder.map(x => {
          renderModel(x, "fuelType");
        });
        // console.log(opt.value);
        localStorage.setItem("slug", `${opt.text}`);
        elements.buttonElement.setAttribute("href", `/package/${opt.text}`);
      });

      elements.fuelElement.addEventListener("change", async e => {
        await localStorage.removeItem("fuelType");
        let optForfuel =
          elements.fuelElement[elements.fuelElement.selectedIndex];
        await localStorage.setItem("fuelType", `${optForfuel.text}`);
      });
    }

    // For the packages page
    if (elements.packageElement) {
      let packageType = [];
      let price = {
        Basic: "value",
        Comprehensive: "value1",
        Standard: "value2"
      };
      let packageId = [];
      let count = 1;
      let countbookingId = 0;
      const getarrayedpackages = async arrayOfpackages => {
        for (let arrayOfpackage of arrayOfpackages) {
          await packageInsert(arrayOfpackage, count, countbookingId);
          await packageType.push(arrayOfpackage.packageType);
          price[`${arrayOfpackage.packageType}`] = arrayOfpackage.price;
          // console.log(price[`${arrayOfpackage.packageType}`]);
          count++;
        }
        console.log(price);
        console.log(document.getElementById("Basic0"));
        document.getElementById("Basic0").addEventListener("click", e => {
          localStorage.removeItem("packageType");
          localStorage.setItem("packageType", "Basic");
          if (price.hasOwnProperty("Basic")) {
            localStorage.removeItem("price");
            localStorage.setItem("price", price["Basic"]);
            // console.log(localStorage.getItem("price"));
          }
        });
        document
          .getElementById("Comprehensive0")
          .addEventListener("click", e => {
            localStorage.removeItem("packageType");
            localStorage.setItem("packageType", "Comprehensive");
            if (price.hasOwnProperty("Comprehensive")) {
              localStorage.removeItem("price");
              localStorage.setItem("price", price["Comprehensive"]);
              // console.log(localStorage.getItem("price"));
            }
          });
        document.getElementById("Standard0").addEventListener("click", e => {
          localStorage.removeItem("packageType");
          localStorage.setItem("packageType", "Standard");
          if (price.hasOwnProperty("Standard")) {
            localStorage.removeItem("price");
            localStorage.setItem("price", price["Standard"]);
            // console.log(localStorage.getItem("price"));
          }
        });

        console.log(packageType);
        // let packageTypeElement = document.getElementsByClassName(
        //   "pricing-el-med"
        // );

        // for (var i = 0; i < packageTypeElement.length; i++) {

        // }
      };
      // console.log(localStorage.getItem("slug"));

      for (var i = 0; i < dataholder.length; i++) {
        if (
          dataholder[i].Model === localStorage.getItem("slug") &&
          dataholder[i].fuelType === localStorage.getItem("fuelType")
        ) {
          getarrayedpackages(dataholder[i].packages);

          localStorage.setItem("dataholderforemail", dataholder[i]);
        }
      }
    }

    // For the Booking page

    if (elements.bookingElement) {
      let packageType = localStorage.getItem("packageType");
      let slugholder = localStorage.getItem("slug");
      let price = localStorage.getItem("price");
      console.log("packageType: " + packageType);
      console.log("packageType: " + slugholder);
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
            price
          );
        });
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
};
