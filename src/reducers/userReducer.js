export function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.playload;
    case "LOGOUT":
      return action.playload;
    default:
      return state;
  }
}
