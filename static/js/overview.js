import axios from "axios";
// import cons from "consolidate";

export default class Models {
  async getresults() {
    try {
      const res = await axios({
        method: "GET",
        url: "http://127.0.0.1:3000/api/v1/carBrand"
      });
      this.results = res.data;
      //   console.log(this.results);
    } catch (error) {
      alert(error);
    }
  }
}

export const booking = async (
  name,
  email,
  phone,
  pickupLocation,
  pinCode,
  slugholder,
  packageType,
  price
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/booking",
      data: {
        name,
        email,
        phone,
        pickupLocation,
        pinCode,
        slugholder,
        packageType,
        price
      }
    });
    console.log("in booking post");
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    alert(err, "Erro in the overview.js");
  }
};
