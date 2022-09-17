const initialState = {
    items: [],
    myStateThing: "",
    user: null, 
    weather: null
  };
  
  // Action Creators 



  export function storeUser(user) {
    return { type: "user/login",
            payload: user };
  }

  // Reducer 

  // get the payload with action.payload 

  function exampleReducer(state = initialState, action) {
    switch (action.type) {
      
   

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