
import { combineReducers } from 'redux'

const realms = (state = [], action) => {
  switch (action.type) {
    case 'REALM_SET':
      return [
        ...action.realms,
      ]
    case 'REALM_REPLACE':
      return state.map(realm =>
        realm.uid === action.modifiedRealm.uid ? { ...action.modifiedRealm } : realm
      )
    case 'REALM_DELETE':
      return state.filter((realm)=>realm.uid !== action.realmUid);
    default:
      return state
  }
}

export default combineReducers({
  realms
})
