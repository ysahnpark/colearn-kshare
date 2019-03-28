package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.time.Instant

@RestController
@RequestMapping("/api/v1/events")
class EventController @Autowired constructor(val eventService: EventService){

    @GetMapping(value = "", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getEvents(@RequestParam(required=false) types: Set<String>?,
                  @RequestParam(required=false) from: Instant? = null,
                  @RequestParam(required=false) to: Instant? = null,
                  @PageableDefault(size = 20) pageable: Pageable) : Page<Event> {

        return eventService.findAll(types, from, to, pageable)
    }

    @GetMapping(value = "/{uid}", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getEvent(@PathVariable uid: String) : Event? {
        return eventService.find(uid)
    }

    @PostMapping(value="", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun addEvent(@RequestBody event: Event): Event {
        return eventService.add(event)
    }

    @PutMapping(value = "/{uid}", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun updateEvent(@PathVariable uid: String, @RequestBody event: Event) : Event? {
        event.uid = uid
        return eventService.update(event)
    }

    @DeleteMapping(value="/{uid}", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun deleteEvent(@PathVariable uid: String): Event {
        return eventService.dalete(uid)
    }
}