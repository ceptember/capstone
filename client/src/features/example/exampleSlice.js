const initialState = {
    items: [],
    myStateThing: "",
    user: null, 
    weather: null
  };
  
  // Action Creators 
  export function sayBoo(saying) {
    return { type: "ghost/haunt",
            payload: saying };
  }

  export function storeUser(user) {
    return { type: "user/login",
            payload: user };
  }

  // Reducer 

  // get the payload with action.payload 

  function exampleReducer(state = initialState, action) {
    switch (action.type) {
      case "count/increment":
        return {
          ...state,
          items: state.items.concat(state.items.length + 1),
        };

      case "ghost/haunt":
        return {
          ...state, 
          myStateThing: action.payload
        }

      case "user/login":
        return{
          ...state,
          user: action.payload
        }

      case "weather/check":
        return{
          ...state,
          weather: action.payload
        }

      default:
        return state;
    }
  }
  
  export default exampleReducer;