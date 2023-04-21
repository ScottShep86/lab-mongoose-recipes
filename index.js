const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
/* mongoose
  .connect(MONGODB_URI)


  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: "Scott Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };
    const latestRecipe = Recipe.create(newRecipe);
    console.log(newRecipe.title)
    return latestRecipe
  })
  .then(() => {
    const allRecipes = Recipe.insertMany(data)
    data.forEach((eachRecipe) => {
      console.log(eachRecipe.title)
    })
    return allRecipes
  })
  .then(() => {
    const updatePasta = Recipe.findOneAndUpdate(
    {title: 'Rigatoni alla Genovese'},
    {duration: 100},
    {new: true})
    return updatePasta
  })
  .then(() => {
    const removeRecipe = Recipe.deleteOne(
    {title: 'Carrot Cake'})
    return removeRecipe
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  }); 
 */

async function startData() {
  try {
    // connect
    await mongoose.connect(MONGODB_URI);
    console.log("Connection to database");

    //delete all recipes
    await Recipe.deleteMany();

    const newRecipe = {
      title: "Scott Pasta",
      level: "Easy Peasy",
      ingredients: ["1/2 cup pasta", "1 cup tomato sauce"],
      cuisine: "Scottish",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 10,
      creator: "Scott",
    };
    await Recipe.create(newRecipe);

    //add all recipes
    await Recipe.insertMany(data);

    //update recipe
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    //remove recipe
    await Recipe.deleteOne({ title: "Carrot Cake" });

    //close connection
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

startData()
