import icons from "url:../../img/icons.svg";
import PreViewView from "./PreViewView";
import View from "./View";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No Bookmarks Yet`;
  _message = "";

  addHandlerRenderer(handler) {
    window.addEventListener("load", handler);
  }

  _genrateMarkup() {
    return this._data
      .map((result) => PreViewView.render(result, false))
      .join("");
  }
}
export default new BookmarkView();
