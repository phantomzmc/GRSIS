import { createStore, combineReducers, applyMiddleware } from "redux";

const cart = {
    image: [],
    counter: 0
}

const cartImage = (state = cart, action) => {
    switch (action.type) {
        case "addImage": {
            state.image = action.payload;
            break;
        }
        case "counterCart": {
            state.counter = action.payload;
            break;
        }
    }
    return state
};


const myLogger = store => next => action => {
    console.log("Log Action", action);
    next(action);
};

const store = createStore(
    combineReducers({
        cartImage
    }),
    {},
    applyMiddleware(myLogger)
);
store.subscribe(() => {
    console.log("Updata Store", store.getState());
});

export default store;