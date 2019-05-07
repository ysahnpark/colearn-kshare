package dev.colearn.kshare.forum.support

import dev.colearn.kshare.forum.Forum
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface ForumRepository: JpaRepository<Forum, Long>, QuerydslPredicateExecutor<Forum> {

    fun findByUid(uid: String): Forum
}