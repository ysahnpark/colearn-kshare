package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import java.time.Instant

interface EventService {
    fun findAll(types: Set<String>? = null, from: Instant? = null, to: Instant? = null, page: Pageable): Page<Event>
    fun find(eventUid: String, loadPosts: Boolean = false ): Event?
    fun add(event: Event): Event
    fun update(event: Event): Event
    fun deleteByUid(eventUid: String): Event
}