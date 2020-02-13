// Transparency.js is used for a more fluid rendering method.

import dataHandler from "./dataHandler.js";
import events from "./events.js";

// create container in HTML

const renderData = {
  helperFunctions: {
    clearElement: el => {
      el = document.querySelector(el);
      if (el) {
        el.innerHTML = "";
      }
    }
  },
  createContainer: () => {
    return new Promise((resolve, reject) => {
      const dataContainer = document.querySelector("#dataContainer");
      const container = document.createElement("li");
      dataContainer.appendChild(container);
      container.classList.add("dataContainer");
      resolve(container);
    });
  },

  product: data => {
    renderData
      .createContainer()
      .then(el => {
        //console.log(data);

        if (dataContainer) {
          // if a previous search has been done, send it to background so new searches are shown on top of page
        }
        dataHandler.verifyData(data).then(product => {
          //  console.log("verified data");
          // console.log(data);
          // debugger;
          const classifiedProduct = dataHandler.createClasses(data.description); // create classes for each item based on description
          const title = dataHandler.firstWord(data.description);
          el.innerHTML = `

          <a href="#showme/${data.fdcId}" id=${data.fdcId} class="${classifiedProduct} productListItem" >
          <p>${title}</p>
          </n>
          
          <span><p>${data.foodPortions[0].gramWeight} gram / portion</p>
          
          </span>
          </a>
          <button class="add${data.fdcId}">Add To Selection!</button>
        `;
          events.listenSelect(el.querySelector(`.add${data.fdcId}`));
        });
      })
      .catch(err => console.error(err));
  },
  asDetailPage: (product, id) => {
    console.log(product);
    // debugger;
    renderData
      .createContainer()
      .then(el => {
        if (product.description == undefined) {
          product.description = `Oh no, it seems id(${id}) is not listed in the DB`;
        }
        el.innerHTML = `
          <div id="${product.fdcId}">
          <p>${product.description}</p>
          </div>
            `;

        renderData.renderTable(el, product); // arg: el=element to inject into | product=food product to insert
      })
      .catch(err => console.error(err));
  },
  renderTable: (el, product) => {
    // render Nutritional value table
    const macroNutrients = [
      "Energy",
      "Protein",
      "Fiber",
      "Water",
      "Carbohydrate",
      "Fat",
      "Sodium",
      "fat",
      "Sugar"
    ];
    // define tables
    const tableMacro = document.createElement("table");
    const tableMicro = document.createElement("table");

    // add table headers
    tableMacro.insertAdjacentHTML(
      "afterbegin",
      `
      <tr>
      <th><b>Nutrient Name</b></th>
      <th><b>Amount</b></th>
      
    </tr>`
    );
    tableMicro.insertAdjacentHTML(
      "afterbegin",
      `
      <tr>
      <th><b>Nutrient Name</b></th>
      <th><b>Amount</b></th>
      
    </tr>`
    );
    //

    // loop through data obj
    product.foodNutrients.forEach(item => {
      let shortName = item.nutrient.name.replace(/[!@#$%^&*(),.?":{}|<>]/g, ""); // standardized name for making different tables. Delete special characters
      shortName = shortName.replace(/([0-9]+)/g, "def"); // standardized name for making different tables. replace numbers by "def"

      macroNutrients.forEach(macro => {
        if (item.nutrient.name.includes(macro)) {
          tableMacro.insertAdjacentHTML(
            "beforeend",
            `
              <tr class="${shortName}">
              <td>${item.nutrient.name} </td>
              <td> ${item.amount} ${item.nutrient.unitName}</td>
              </tr>
              `
          );
        }
      });
      if (
        !document.querySelector(`${shortName}`) &&
        !macroNutrients.includes(shortName)
      ) {
        tableMicro.insertAdjacentHTML(
          "beforeend",
          `
                      <tr class="${item.nutrient.name}">
                      <td>${item.nutrient.name} </td>
                      <td> ${item.amount} ${item.nutrient.unitName}</td>
                      </tr>
                      `
        );
      }
    });
    el.appendChild(tableMacro);
    el.appendChild(tableMicro);
  },
  renderImage: (src, ID) => {
    // render image retrieved form unsplash api
    const el = document.getElementById(`${ID}`);

    el.insertAdjacentHTML(
      "beforeend",
      `
      <img src="${src}">
      `
    );
  }
};
export default renderData;
