Manual Test
===========

# Realm
## Post Data
curl -X POST -d @./src/test/kotlin/dev/colearn/kshare/realm/sample-realm.json -H "Content-Type: application/json" http://localhost:8080/api/v1/realms


# Event
## Get Event data
curl -X GET http://localhost:8080/api/v1/TEST/events
curl -X GET http://localhost:8080/api/v1/TEST/events?sort=start,desc
curl -X GET http://localhost:8080/api/v1/TEST/events?from=2019-01-10T12:00:00Z&sort=start,desc
curl -X GET http://localhost:8080/api/v1/TEST/events?from=2019-04-10T22:20:56.091Z&sort=start,desc


## Post Data
curl -X POST -d @./src/test/kotlin/dev/colearn/kshare/eventum/sample-event.json -H "Content-Type: application/json" http://localhost:8080/api/v1/TEST/events

## Delete Data
curl -X DELETE http://localhost:8080/api/v1/TEST/events/48695d55-0be5-4d29-a0d3-43399ff6e1fb