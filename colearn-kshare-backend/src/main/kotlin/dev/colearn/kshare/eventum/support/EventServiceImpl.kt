package dev.colearn.kshare.eventum.support

import com.querydsl.core.BooleanBuilder
import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.eventum.QEvent
import dev.colearn.kshare.forum.Post
import dev.colearn.kshare.forum.support.ForumService
import dev.colearn.kshare.realm.support.RealmContextHolder
import dev.colearn.kshare.realm.support.RealmService
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.lang.IllegalStateException
import java.time.Instant


@Service
class EventServiceImpl @Autowired constructor (
        val eventRepository: EventRepository,
        val realmService: RealmService,
        val forumService: ForumService
) : EventService {

    override
    fun findAll(types: Set<String>?, from: Instant?, to: Instant?, page: Pageable): Page<Event> {

        var booleanBuilder = BooleanBuilder()
        if (types != null && types.isNotEmpty()) {
            booleanBuilder.and(QEvent.event.type.`in`(types))
        }
        if (from != null) {
            booleanBuilder.and(QEvent.event.start.after(from))
        }
        if (to != null) {
            booleanBuilder.and(QEvent.event.start.before(to))
        }

        val sorting = if (page?.sort != null && page.sort.isSorted) page.sort else Sort.by(Sort.Direction.ASC, "start")
        var paging = if (page != null) PageRequest.of(page.pageNumber, page.pageSize, sorting)
        else PageRequest.of(0, 10, sorting)

        return eventRepository.findAll(booleanBuilder, paging)
    }

    override fun find(eventUid: String, loadPost: Boolean): Event? {
        var event = eventRepository.findByUid(eventUid)

        if (loadPost && event?.postThreadUid != null) {
            event.post = forumService.findPost(event.postThreadUid!!)
        }

        return event
    }

    override
    fun add(event: Event): Event {

        // val realm = realmService.find(event.realmUid!!)
        val realm = RealmContextHolder.getRealm()

        if (realm?.forumUid != null) {
            val eventThreadPost = Post(forumUid = realm!!.forumUid!!, title= event.title, body = "Discussion on " + event.title)
            val savedEventThreadPost = forumService.addPost(eventThreadPost)
            event.postThreadUid = savedEventThreadPost.uid
        }

        event.sid = null
        event.uid = null

        return eventRepository.save(event)
    }

    override
    fun update(event: Event): Event {
        if (event.uid == null) {
            throw IllegalArgumentException("UID not provided")
        }

        var foundEvent = eventRepository.findByUid(event.uid!!) ?: throw IllegalStateException("Event [$event.uid] Not Found")
        BeanUtils.copyProperties(event, foundEvent, "sid", "uid", "createdAt", "updatedAt")

        return eventRepository.save(foundEvent)
    }

    override
    fun deleteByUid(eventUid: String): Event {
        var foundEvent = eventRepository.findByUid(eventUid) ?: throw IllegalStateException("Not Found: UID[$eventUid]")

        eventRepository.delete(foundEvent)

        return foundEvent
    }
}