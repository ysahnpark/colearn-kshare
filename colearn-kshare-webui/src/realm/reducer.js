
import { combineReducers } from 'redux'

const realm = (state = [], action) => {
  switch (action.type) {
    case 'REALM_SET':
      return {...action.realm}
    case 'REALM_REPLACE':
      return { ...action.modifiedRealm }
    default:
      return state
  }
}

export default combineReducers({
  realm
})
