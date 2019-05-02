import { connect } from 'react-redux'
import EventList from './EventList'
import { loadEventsAsync, addEventAsync, updateEventAsync, deleteEventAsync } from './actions'
import { VisibilityFilters } from './actions'


const getVisibleEvents = (events, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return events
    case VisibilityFilters.SHOW_COMPLETED:
      return events.filter(t => t.start < Date.now())
    case events.SHOW_ACTIVE:
      return events.filter(t => t.start >= Date.now())
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

// NOTE: If the state structure changes, make sure to reflect it as parameter
// See ./index.js for the namespace used for the eventReducer when building the rootReducer
const mapStateToProps = ({eventReducer}) => ({
  events: getVisibleEvents(eventReducer.events, eventReducer.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  loadEvents: (realmId, queryString) => dispatch(loadEventsAsync(realmId, queryString)),
  addEvent: (event, realmId) => dispatch(addEventAsync(event, realmId)),
  updateEvent: (event, realmId) => dispatch(updateEventAsync(event, realmId)),
  deleteEvent: (eventUid, realmId) => dispatch(deleteEventAsync(eventUid, realmId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)