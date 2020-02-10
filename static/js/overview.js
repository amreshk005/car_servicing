import axios from "axios";
// import cons from "consolidate";

export default class Models {
  async getresults() {
    try {
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      // const proxy = "https://crossorigin.me/";
      const res = await axios({
        method: "GET",
        // url: `http://www.mechmycar.com/api/v1/carbrand`
        url: `http://www.mechmycar.com/api/v1/carbrand`
        // url: `http://127.0.0.1:8000/api/v1/carbrand`
      });
      // res.setHeader("Access-Control-Allow-Origin", "*");
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
    const proxy = "https://cors-anywhere.herokuapp.com/";
    // const proxy = "https://crossorigin.me/";

    const res = await axios({
      method: "POST",
      // url: `http://www.mechmycar.com/api/v1/booking`,
      url: `http://www.mechmycar.com/api/v1/booking`,
      // url: `http://127.0.0.1:8000/api/v1/booking`,
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
    // res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("in booking post");
    if (res.data.status === "success") {
      alert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    alert(err, "Erro in the overview.js");
  }
};
