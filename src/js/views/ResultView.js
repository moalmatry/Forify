import PreViewView from "./PreViewView";
import View from "./View";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No Recipe found 😔`;
  _message = "";

  _genrateMarkup() {
    return this._data
      .map((result) => PreViewView.render(result, false))
      .join("");
  }
}

export default new ResultView();
