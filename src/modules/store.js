import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import { fromJS } from "immutable";

export const history = createBrowserHistory();

export default function configureStore(preloadedState = fromJS({})) {
	const store = createStore(
		createRootReducer(history),
		preloadedState,
		compose(applyMiddleware(routerMiddleware(history)))
	);

	return store;
}
