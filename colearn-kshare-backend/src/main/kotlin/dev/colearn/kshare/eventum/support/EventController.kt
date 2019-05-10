package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.framework.Constants
import dev.colearn.kshare.post.support.PostController
import dev.colearn.kshare.realm.Realm
import dev.colearn.kshare.realm.support.RealmContextHolder
import dev.colearn.kshare.realm.support.RealmLoaderFilter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.hateoas.Resource
import org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo
import org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.time.Instant
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/v1/{realmId}/events")
class EventController @Autowired constructor(val eventService: EventService) {

    @GetMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getEvents(@PathVariable(required = true) realmId: String,
                  @RequestParam(required = false) types: Set<String>?,
                  @RequestParam(required = false) from: Instant? = null,
                  @RequestParam(required = false) to: Instant? = null,
                  @PageableDefault(size = Constants.DEFAULT_PAGE_SIZE) pageable: Pageable): Page<Event> {

        // TODO: addForum realmId
        return eventService.findAll(types, from, to, pageable)
    }

    @GetMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getEvent(@PathVariable(required = true) realmId: String,
                 @PathVariable uid: String, request: HttpServletRequest): Resource<Event>? {

        // HATEOAS 1.0: var representation = EntityModel<Event>(eventService.find(uid, true))

        val currentRealm = RealmContextHolder.getRealm()
        //val currentRealm = request.getAttribute(RealmLoaderFilter.REALM_ATTRIB) as Realm?
        val representation = Resource<Event>(eventService.find(uid, true))

        representation.add(linkTo(methodOn(PostController::class.java)
                .getPosts(currentRealm!!.uid!!, currentRealm.forumUid!!, null)
        ).withRel("post"))
        return representation

//        return eventService.find(uid, true)
    }

    @PostMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun addEvent(@PathVariable(required = true) realmId: String,
                 @RequestBody event: Event, request: HttpServletRequest): Event {
        val currentRealm = request.getAttribute(RealmLoaderFilter.REALM_ATTRIB) as Realm
        event.realmUid = currentRealm.uid
        return eventService.add(event)
    }

    @PutMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun updateEvent(@PathVariable(required = true) realmId: String,
                    @PathVariable uid: String, @RequestBody event: Event): Event? {
        event.uid = uid
        return eventService.update(event)
    }

    @DeleteMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun deleteEvent(@PathVariable(required = true) realmId: String,
                    @PathVariable uid: String): Event {
        return eventService.deleteByUid(uid)
    }
}