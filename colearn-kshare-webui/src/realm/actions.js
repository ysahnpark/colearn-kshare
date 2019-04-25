import moment from 'moment'

export const fetchCompleted = message => ({
  type: 'REALM_FETCH_COMPLETED',
  message
})

export const setRealm = (realm) => ({
  type: 'REALM_SET',
  realm
})

export const replaceRealm = (realm) => ({
  type: 'REALM_REPLACE',
  modifiedRealm: realm
})

export const deleteRealm = (realmUid) => ({
  type: 'REALM_DELETE',
  realmUid
})

// TODO: Parameterize base URL from ENV
function realmsBaseUrl() {
  return "http://localhost:8080/api/v1/realms";
}

export function loadRealmAsync(realmId, url) {
  return (dispatch) => {
    if (!url) {
      url = realmsBaseUrl() + "/" + realmId
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
      .then((json) => dispatch(setRealm(json.content)))
      .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}


export function updateRealmAsync(realm, realmId, url) {
  return (dispatch) => {
    if (!url) {
      url = realmsBaseUrl(realmId) + "/" + realm.uid
    }
    realm.start = moment(realm.start).toISOString()
    realm.end = moment(realm.end).toISOString()
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(realm),
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
      .then((json) => dispatch(replaceRealm(json)))
      .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}

export function deleteRealmAsync(realmUid, realmId, url) {
  return (dispatch) => {
    if (!url) {
      url = realmsBaseUrl(realmId) + "/" + realmUid
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
      .then((json) => dispatch(deleteRealm(json.uid)))
      .catch((error) => dispatch(fetchCompleted("Error: " + error)));
  }
}
