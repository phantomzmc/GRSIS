import { createStore, combineReducers, applyMiddleware } from "redux";

const cart = {
    image: [],
    counter: 0
}
const token = (state = { token: "" }, action) => {
    switch (action.type){
        case "setToken" : {
            state.token = action.payload
            break;
        }
    }
    return state
};

const event = (state= {} ,action) => {
    switch (action.type){
        case "setEvent" : {
            state.event = action.payload
            break;
        }
    }
    return state
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
        event,
        cartImage,
        token
    }),
    {},
    applyMiddleware(myLogger)
);
store.subscribe(() => {
    console.log("Updata Store", store.getState());
});

export default store;