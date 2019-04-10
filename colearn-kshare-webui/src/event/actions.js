import moment from 'moment'

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

const EVENTS_BASE_URL = "http://localhost:8080/api/v1/events"

export function loadEventsAsync(url) {
  return (dispatch) => {
    if (!url) {
      url = EVENTS_BASE_URL
    }
    let now = new Date();
    url += "?from=" + now.toISOString() + "&sort=start,desc"
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


export function addEventAsync(event, url) {
  return (dispatch) => {
    if (!url) {
      url = EVENTS_BASE_URL
    }
    event.start = moment(event.start).toISOString()
    event.end = moment(event.end).toISOString()
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => loadEventsAsync()(dispatch))
      .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}

export function updateEventAsync(event, url) {
  return (dispatch) => {
    if (!url) {
      url = EVENTS_BASE_URL + "/" + event.uid
    }
    event.start = moment(event.start).toISOString()
    event.end = moment(event.end).toISOString()
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
      url = EVENTS_BASE_URL + "/" + eventUid
    }
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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