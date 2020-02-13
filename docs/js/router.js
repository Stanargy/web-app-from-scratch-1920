import init from "./init.js"; // import initialization function
import getData from "./api.js";

const router = {
  init: () => {},
  routie:
    // Init app, set base url equal to home
    routie({
      "": () => {
        console.log(`Welcome: index`);
        // call init
        addEventListener("DOMContentLoaded", e => {
          init.now();
        });
      },

      "products/:id": id => {
        console.log(`succesfully entered the Listing Page by ID: ${id}`); //Listing Page, This page shows a list of products as retrieved from the data api
        addEventListener("DOMContentLoaded", e => {
          init.now(); //
          init.List(id);
        });
      },
      "showme/:id": id => {
        console.log(`succesfully entered the Listing Page by ID: ${id}`); //Detail Page, This page shows a specific product's nutritional contents as retrieved from the data api
        init.now();
        getData.getFoodById(id);
      },

      "*": () => {
        console.log(
          `404 && Page not found: ${window.location.hash}. Redirecting to index.html` // need 2 add feature Give User Feedback!
        );
        window.location.hash = "";
      }
    })
};

export default router;
