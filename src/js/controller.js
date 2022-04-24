import * as model from "./model";
import recipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";
import ResultView from "./views/ResultView";
import BookMarkView from "./views/BookMarkView";
import PaginationView from "./views/PaginationView";
import AddRecipeView from "./views/AddRecipeView";
import "core-js/stable";
import "regenerator-runtime/runtime";
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 0) Rendering
    ResultView.update(model.getSearchResultPage());
    BookMarkView.update(model.state.bookmarks);

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering the Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controllSearchResults = async function () {
  try {
    // Get Search QUERY
    const query = SearchView.getQuery();
    if (!query) return;
    ResultView.renderSpinner();

    // Load Search Reasult
    await model.loadSearchResult(query);

    // Render Result
    ResultView.render(model.getSearchResultPage(1));

    // Render initaial Pagination buttons
    PaginationView.render(model.state.search);
    // Test result
  } catch (err) {
    console.log(err);
  }
};

const controllPagination = function (goToPage) {
  // Render New Result
  ResultView.render(model.getSearchResultPage(goToPage));

  // Render New Pagination buttons
  PaginationView.render(model.state.search);
};

const controllServing = function (newS) {
  // Update Recipe Serving
  model.updateServing(newS);
  //Update The recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controllAddBookMark = function () {
  // 1) Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  BookMarkView.render(model.state.bookmarks);
};

const controllBookmarks = function () {
  BookMarkView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipe) {
  try {
    // Show Spinner
    // AddRecipeView.renderSpinner();
    // Upload The new Recipe Data
    await model.uploadRecipe(newRecipe);
    // Render Recipe
    recipeView.render(model.state.recipe);
    // Success Message
    AddRecipeView.renderMessage();
    // Render The Bookmark
    BookMarkView.render(model.state.bookmarks);
    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // Close Form Window
    setTimeout(() => {
      AddRecipeView._toggleWindow;
    }, 1000);
  } catch (err) {
    console.error(err);
    AddRecipeView.renderError(err.message);
  }
};

const init = function () {
  BookMarkView.addHandlerRenderer(controllBookmarks);
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServings(controllServing);
  recipeView.addHandlerAddbookMark(controllAddBookMark);
  SearchView.addHandlerSearch(controllSearchResults);
  PaginationView.addHandlerClick(controllPagination);
  AddRecipeView.addHandlerUpload(controllAddRecipe);
};
init();
