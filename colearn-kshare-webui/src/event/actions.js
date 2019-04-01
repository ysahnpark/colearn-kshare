export const fetchCompleted = message => ({
  type: 'FETCH_COMPLETED',
  message
})

export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  events
})

export const replaceEvent = (event) => ({
  type: 'REPLACE_EVENT',
  modifiedEvent: event
})

export const deleteEvent = (eventUid) => ({
  type: 'DELETE_EVENT',
  eventUid
})

export function loadEventsAsync(url) {
  return (dispatch) => {
    if (!url) {
      url = "http://localhost:8080/api/v1/events"
    }
    return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((json) => dispatch(setEvents(json.content)))
            .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}

export function updateEventAsync(event, url) {
  return (dispatch) => {
    if (!url) {
      url = "http://localhost:8080/api/v1/events/" + event.uid
    }
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers:{
        'Content-Type': 'application/json'
      }})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((json) => dispatch(replaceEvent(json)))
            .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}

export function deleteEventAsync(eventUid, url) {
  return (dispatch) => {
    if (!url) {
      url = "http://localhost:8080/api/v1/events/" + eventUid
    }
    return fetch(url, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            // TODO: Reload to reflect possible changes in the server
            .then((json) => dispatch(deleteEvent(json.uid)))
            .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PAST: 'SHOW_PAST',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}