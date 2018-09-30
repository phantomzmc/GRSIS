import { createStore, combineReducers, applyMiddleware } from "redux";


const cart = {
    image: [],
    counter: 0
}
const token = (state = { token: "" }, action) => {
    switch (action.type) {
        case "setToken": {
            state.token = action.payload
            break;
        }
    }
    return state
};

const event = (state = { photoGraID: "" }, action) => {
    switch (action.type) {
        case "setEvent": {
            state.event = action.payload
            break;
        }
        case "setPhotoGraID": {
            state.photoGraID = action.payload
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
const order = (state = { orderlist: [], orderlistFull: [], totalPrice: 0.0 }, action) => {
    switch (action.type) {
        case "addOrderList": {
            state.orderlist = action.payload;
            break;
        }
        case "addOrderlistFull": {
            state.orderlistFull = action.payload
            break;
        }
        case "setTotalPrice": {
            state.totalPrice = action.payload
            break;
        }
        case "invoiceOrder": {
            state.invoice = action.payload
            break;
        }
    }
    return state
}
const address = (state = {}, action) => {
    switch (action.type) {
        case "setAddress": {
            state.address = action.payload
            break;
        }
    }
    return state
};
const payment = (state = {} ,action) => {
    switch (action.type){
        case "setTypePayment" : {
            state.type  = action.payload
            break;
        }
    }
    return state
}



const myLogger = store => next => action => {
    console.log("Log Action", action);
    next(action);
};

const store = createStore(
    combineReducers({
        event,
        cartImage,
        token,
        order,
        address,
        payment
    }),
    {},
    applyMiddleware(myLogger)
);
store.subscribe(() => {
    console.log("Updata Store", store.getState());
});

export default store;