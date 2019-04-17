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

const mapStateToProps = state => ({
  events: getVisibleEvents(state.events, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  loadEvents: (realmId) => dispatch(loadEventsAsync(realmId)),
  addEvent: (event, realmId) => dispatch(addEventAsync(event, realmId)),
  updateEvent: (event, realmId) => dispatch(updateEventAsync(event, realmId)),
  deleteEvent: (eventUid, realmId) => dispatch(deleteEventAsync(eventUid, realmId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)