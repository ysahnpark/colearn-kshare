Manual Test
===========

# Realm
## Post Data
curl -X POST -d @./src/test/kotlin/dev/colearn/kshare/realm/sample-realm.json -H "Content-Type: application/json" http://localhost:8080/api/v1/realms


# Event
## Get Event data
curl -X GET http://localhost:8080/api/v1/HOST/events
curl -X GET http://localhost:8080/api/v1/TEST/events?sort=start,desc
curl -X GET http://localhost:8080/api/v1/TEST/events?from=2019-01-10T12:00:00Z&sort=start,desc
curl -X GET http://localhost:8080/api/v1/TEST/events?from=2019-04-10T22:20:56.091Z&sort=start,desc


## Post Data
curl -X POST -d @./src/test/kotlin/dev/colearn/kshare/eventum/sample-event.json -H "Content-Type: application/json" http://localhost:8080/api/v1/HOST/events

## Delete Data
curl -X DELETE http://localhost:8080/api/v1/TEST/events/48695d55-0be5-4d29-a0d3-43399ff6e1fb


JIRA Update
We have a project with epics now, with some updates made to those epics.
Julien is creating stories
Kevin has been working on some integration with JIRA and GitLab
We have a JIRA non-prod for trying things.


Data migration issues
One of the problems that comes up is that teams understimate the time they need for data migrations.
This came up on Bruce, b/c it turned out that there were data quality problems.
Often, we don't anticipate where the data problems will be. We just have to start and find out.
Once we get data cleaned and aligned, how do we intend to keep them that way?
There's further conversation that needs to happen around that.

Do we have any greenfield apps?
Do we have any greenfield apps coming up that would be a good use case for the Platform team recommendations/standards/etc.?
Music is the biggest case.