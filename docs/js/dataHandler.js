// seperate first word of description for group select with class.
// module for structuring of data retrieved from API-requests

export default {
  createClasses: description => {
    const classname = description.replace(/\s*,\s*|\s+,/g, ""); //
    return classname;
  },
  firstWord: description => {
    // seperate first word of description for image querying
    let firstName = description.split(0, 3);
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
