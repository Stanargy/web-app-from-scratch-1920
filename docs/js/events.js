const events = {
  listenSelect: el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const id = e.target.getAttribute("class").substring(3);
      if (!el.innerText.substring("&#10004;")) {
        // insert checkmark for user feedback
        el.insertAdjacentHTML("beforeend", "&#10004;");
      }
      events.addSelection(id); // add to selection
    });
  },
  addSelection: id => {
    const store = localStorage.getItem("selected");
    if (store) {
      // check if old storage exists
      const storeList = store.split(","); // split the old storage into individual id's and put into array
      storeList.forEach(listID => {
        // loop through each id
        if (storeList.includes(id)) {
          // do nothing when the id is allready in the list
        } else {
          // if new id doesn't match store the id
          storeList.push(id);
          // add new id to list
          localStorage.setItem("selected", storeList); // add new list to storage
          events.addCount(); // update counter
        }
      });
    } else {
      // if there is no old storage just add the id
      localStorage.setItem("selected", id);
      events.addCount(); // update counter
    }
  },
  ActivateClearLocalStorageBtn: () => {
    const el = document.querySelector("#clearLocalStorageBtn");
    el.addEventListener("click", e => {
      e.preventDefault();
      let counter = document.querySelector("#counter"); // select counter
      counter.innerText = "0";
      localStorage.removeItem("selected");
    });
  },
  addCount: () => {
    let counter = document.querySelector("#counter"); // select counter
    counter.innerText = localStorage.getItem("selected").split(",").length;
  },
  AddProductToLocalStorage: product => {
    const productAsString = JSON.stringify(product);
    console.log("storing Product");
    localStorage.setItem(product.fdcId, productAsString);
  },
  productIsStored: Id => {
    // checks by Id if a product is already stored in localStorage
    if (localStorage.getItem(Id)) {
      console.log("product retrieved from storage");
      return true;
    } else {
      return false;
    }
  }
};
export default events;
