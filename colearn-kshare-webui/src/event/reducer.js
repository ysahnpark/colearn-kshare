
import { combineReducers } from 'redux'
import { VisibilityFilters } from './actions'

const events = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return [
        ...action.events,
      ]
    case 'REPLACE_EVENT':
      return state.map(event =>
        event.uid === action.modifiedEvent.uid ? { ...action.modifiedEvent } : event
      )
    default:
      return state
  }
}

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default combineReducers({
  events,
  visibilityFilter
})
