import key from "./config.js";
import renderData from "./render.js";
import events from "./events.js";

const getData = {
  getFoodlistByQuery: userSearchQuery => {
    renderData.helperFunctions.clearElement("#dataContainer"); // clear out view
    renderData.helperFunctions.clearElement(".dataContainer"); // clear out view
    console.log("getData Fired");
    fetch(
      // retrieve data using the Fetch API
      `https://api.nal.usda.gov/fdc/v1/search?api_key=${key.key}&generalSearchInput=${userSearchQuery}` // insert query params
    )
      .then(res => {
        res = res.json(); // parse to JSON
        return res;
      })
      .then(res => {
        getData.getFoodListSpecs(res.foods);
      })

      .catch(err => {
        // log if(err)
        console.log(err);
      });
  },
  getFoodImage: (query, ID) => {
    // retrieve an image src based on the title of the selected product Uses Unsplash API

    fetch(
      `https://api.unsplash.com/photos/?client_id=e09bcdea8640e0ca5c1a784db89b456e892f1efa3aed0c67d8720948d2c12f5c&query=${query}`
    )
      .then(res => {
        res = res.json();
        return res;
      })
      .then(res => {
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
      events.productIsStored(food.fdcId)
        ? renderData.product(localStorage.getItem(food.fdcId))
        : fetch(
            `https://api.nal.usda.gov/fdc/v1/${food.fdcId}?api_key=${key.key}`
          )
            .then(res => {
              res = res.json();
              return res;
            })
            .then(res => {
              // getData.getFoodImage(res.description.split(",")[0], res.fdcId); // Retrieve Image based on description from unsplash API
              renderData.product(res); // Render product to View
              events.AddProductToLocalStorage(res); // Store Product in LocalStorage For Overview
            })
            .catch(err => console.error(err));
    });
  },
  getFoodById: id => {
    renderData.helperFunctions.clearElement("#dataContainer"); // clear out view
    renderData.helperFunctions.clearElement(".dataContainer"); // clear out view
    fetch(`https://api.nal.usda.gov/fdc/v1/${id}?api_key=${key.key}`)
      .then(res => {
        res = res.json();
        return res;
      })
      .then(res => {
        renderData.asDetailPage(res, id);
      })
      .catch(err => console.error(err));
  },
  getOverview: () => {}
};

export default getData;
