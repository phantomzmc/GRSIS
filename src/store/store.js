import { createStore, combineReducers, applyMiddleware } from "redux";


const cart = {
    image: [],
    counter: 0
}
const events = {
    event : {
        PhotoGrapher : {}
    }
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

const event = (state = events, action) => {
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
const order = (state = { orderlist: [], orderlistFull: [], totalPrice: 0.0, pricePost: 0.0 ,quantity : 0}, action) => {
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
        case "setCreditCharge": {
            state.credit = action.payload
            break;
        }
        case "setPricePost": {
            state.pricePost = action.payload
            break;
        }
        case "invoiceOrder": {
            state.invoice = action.payload
            break;
        }
        case "setQuantity" : {
            state.quantity = action.payload
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
const payment = (state = { changeid: "", transaction: "", type: 1 }, action) => {
    switch (action.type) {
        case "setTypePayment": {
            state.type = action.payload
            break;
        }
        case "setStatusPayment": {
            state.statusPayment = action.payload
            break;
        }
        case "setChangeID": {
            state.changeid = action.payload
            break;
        }
        case "setTransaction": {
            state.transaction = action.payload
            break;
        }
        case "setSlip": {
            state.slip = action.payload
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