// seperate first word of description for group select with class.
// module for structuring of data retrieved from API-requests

export default {
  createClasses: data => {
    const classname = data.description.replace(/\s*,\s*|\s+,/g, ""); //
    return classname;
  },
  firstWord: data => {
    // seperate first word of description for image querying
    let firstName = data.description.split(0, 3);
    firstName = firstName[0];
    return firstName;
  },
  filterDuplicates: data => {},
  verifyData: product => {
    // this function checks if a product has the prerequisities needed before rendering. right now it needs to include a gramWeight prop.
    return new Promise((resolve, reject) => {
      resolve(product);
    });
  }
};
