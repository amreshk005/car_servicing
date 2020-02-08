import "@babel/polyfill";
import Models, { booking } from "./overview";
import { elements } from "./queryHolder";
import { renderModel, clearModeloptions, packageInsert } from "./insertElement";
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

      console.log("yeah in index");
      document.onload = (async function() {
        console.log(dataholder);
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
      console.log("yeah in index 1");
      console.log(window.location.href);
      // };

      // For Model in Index page

      elements.manufacturer.addEventListener("change", async e => {
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
      console.log("we are in package");
      const getarrayedpackages = arrayOfpackages => {
        for (let arrayOfpackage of arrayOfpackages) {
          packageInsert(arrayOfpackage);
        }
      };
      // console.log(localStorage.getItem("slug"));
      for (var i = 0; i < dataholder.length; i++) {
        console.log(localStorage.getItem("slug"));
        console.log(localStorage.getItem("fuelType"));

        if (
          dataholder[i].Model === localStorage.getItem("slug") &&
          dataholder[i].fuelType === localStorage.getItem("fuelType")
        ) {
          getarrayedpackages(dataholder[i].packages);
          console.log(dataholder[i]);
          localStorage.setItem("dataholderforemail", dataholder[i]);
        }
      }
    }

    // For the Booking page
    console.log(elements.bookingElement);
    if (elements.bookingElement) {
      console.log("inside of booking");
      let packageType = localStorage.getItem("packageType");
      let slugholder = localStorage.getItem("slug");
      let price = localStorage.getItem("price");

      console.log(packageType, slugholder, price);

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
};
