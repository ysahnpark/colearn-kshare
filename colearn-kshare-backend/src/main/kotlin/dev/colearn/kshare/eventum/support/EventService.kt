package dev.colearn.kshare.eventum.support

import com.querydsl.core.types.CollectionExpression
import com.querydsl.core.types.dsl.BooleanExpression
import com.querydsl.core.types.dsl.Expressions
import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.eventum.QEvent
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class EventService @Autowired  constructor (
        val eventRepository: EventRepository
){

    fun findAll(types: Set<String>? = null, from: Instant? = null, to: Instant? = null, page: Pageable): Page<Event> {

        var predicate: BooleanExpression = QEvent.event.isNotNull
        if (types != null && types.isNotEmpty()) {
            predicate = QEvent.event.type.`in`(types)
        }
        if (from != null) {
            predicate = predicate.and(QEvent.event.start.after(from))
        }
        if (to != null) {
            predicate = predicate.and(QEvent.event.start.before(to))
        }

        return eventRepository.findAll(predicate, page)
    }
}