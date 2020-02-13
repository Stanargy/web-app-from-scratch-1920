import key from "./config.js";
import renderData from "./render.js";
import events from "./events.js";

const getData = {
  getFoodlistByQuery: userSearchQuery => {
    renderData.helperFunctions.clearElement("#dataContainer");
    renderData.helperFunctions.clearElement(".dataContainer");
    console.log("getData Fired");
    fetch(
      // retrieve data using the Fetch API
      `https://api.nal.usda.gov/fdc/v1/search?api_key=${key.key}&generalSearchInput=${userSearchQuery}` // insert query params
    )
      .then(res => {
        res = res.json(); // parse to JSON
        return res;
        // resID = res.foods.filter(item => {
        //   return item.fdcId;
        // });
      })
      .then(res => {
        // console.log("asdvajdv");
        // console.log(res);

        //renderData.list(res); // call rendering method

        getData.getFoodListSpecs(res.foods);
      })

      .catch(err => {
        // log if(err)
        console.log(err);
      });
  },
  getFoodImage: (query, ID) => {
    // retrieve an image src based on the title of the selected product
    // Uses Unsplash API
    //
    // console.log(`Fetching image for ${query}`);

    fetch(
      `https://api.unsplash.com/photos/?client_id=e09bcdea8640e0ca5c1a784db89b456e892f1efa3aed0c67d8720948d2c12f5c&query=${query}`
    )
      .then(res => {
        res = res.json();
        return res;
      })
      .then(res => {
        // console.log(res);
        // console.log(`succesfully retrieved url: ${res[0].urls.small}`);
        if (res) {
          renderData.renderImage(res[0].urls.small, ID);
        }
      })
      .catch(err => {
        console.error(err);
        renderData.renderImage("./assets/placeholder.jpg", ID);
      });
  },
  getFoodListSpecs: list => {
    console.log(`Retrieve by ID fired`);

    list.forEach(food => {
      fetch(`https://api.nal.usda.gov/fdc/v1/${food.fdcId}?api_key=${key.key}`)
        .then(res => {
          res = res.json();

          return res;
        })
        .then(res => {
          //renderData.specificInfo(res);
          getData.getFoodImage(res.description.split(",")[0], res.fdcId);
          renderData.product(res);
        })
        .catch(err => console.error(err));
    });
  },
  getFoodById: id => {
    fetch(`https://api.nal.usda.gov/fdc/v1/${id}?api_key=${key.key}`)
      .then(res => {
        res = res.json();
        return res;
      })
      .then(res => {
        renderData.asDetailPage(res, id);
      })
      .catch(err => console.error(err));
  }
};

export default getData;
