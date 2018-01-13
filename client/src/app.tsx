import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/stores/store";
import TasksList from "./containers/tasks-list/container";

ReactDOM.render(
  <Provider store={store}>
    <TasksList />
  </Provider>,
  document.getElementsByTagName("body")[0]);
  