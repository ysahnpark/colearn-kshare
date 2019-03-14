package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import org.springframework.data.querydsl.QuerydslPredicateExecutor
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface EventRepository : JpaRepository<Event, Long>, QuerydslPredicateExecutor<Event> {
    fun findByType(type: String): List<Event>
}