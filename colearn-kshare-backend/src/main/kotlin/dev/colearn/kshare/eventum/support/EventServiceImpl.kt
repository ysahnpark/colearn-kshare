package dev.colearn.kshare.eventum.support

import com.querydsl.core.BooleanBuilder
import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.eventum.QEvent
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
        val eventRepository: EventRepository
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

    override fun find(eventUid: String): Event? {
        return eventRepository.findByUid(eventUid)
    }

    override
    fun add(event: Event): Event {
        event.sid = null
        event.uid = null
        return eventRepository.save(event)
    }

    override
    fun update(event: Event): Event {
        if (event.sid == null) {
            throw IllegalArgumentException("SID not provided")
        }

        var foundEvent = eventRepository.findById(event.sid!!)
        BeanUtils.copyProperties(event, foundEvent, "sid", "uid", "createdAt", "updatedAt")

        return eventRepository.save(event)
    }

    override
    fun dalete(eventUid: String): Event {
        var foundEvent = eventRepository.findByUid(eventUid) ?: throw IllegalStateException("Not Found: UID[$eventUid]")

        eventRepository.delete(foundEvent)

        return foundEvent
    }
}