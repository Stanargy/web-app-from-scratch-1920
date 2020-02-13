import getData from "./api.js"; // import API -  {API-Requests}
import renderData from "./render.js";
import events from "./events.js";
// cancel reload on submit
const init = {
  now: () => {
    //   console.log("init fired");
    const foodQuery = document.querySelector("#foodQuery");

    events.ActivateClearLocalStorageBtn();

    foodQuery.addEventListener("input", e => {
      e.preventDefault();
      //console.log(e.target);
      console.log(`input changed to: ${e.target.value}`);

      e.target.value.length > 5
        ? getData.getFoodlistByQuery(e.target.value)
        : init.userFeedback(e.target.value);
    });
  },
  List: id => {
    id.length > 5 ? getData.getFoodlistByQuery(id) : init.userFeedback(id);
  },
  userFeedback: query => {
    // this gets called when a user queries something shorter then 5 characters
    // this function calls a render method that provides the user feedback about this status
    console.log(
      `please provide more than 5 character query. Current querylength = ${query.length}`
    ); // add feature user feedback!
  }
};

export default init;
