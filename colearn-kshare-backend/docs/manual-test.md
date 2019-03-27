Manual Test
===========


# Get data
curl -X GET http://localhost:8080/api/v1/events

# Post Data
curl -X POST -d @./src/test/kotlin/dev/colearn/kshare/eventum/sample-event.json -H "Content-Type: application/json" http://localhost:8080/api/v1/events

# Delete Data
curl -X DELETE http://localhost:8080/api/v1/events/48695d55-0be5-4d29-a0d3-43399ff6e1fb