package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

@RestController
@RequestMapping("/api/event/v1")
class EventController @Autowired constructor(val eventService: EventService){

    @GetMapping(value = "/", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getEvents(@RequestParam(required=false) types: Set<String>?,
                  @RequestParam(required=false) from: Instant? = null,
                  @RequestParam(required=false) to: Instant? = null,
                  @PageableDefault(size = 20) pageable: Pageable) : Page<Event> {

        return eventService.findAll(types, from, to, pageable)
    }
}