package dev.colearn.kshare.forum.support

import dev.colearn.kshare.forum.Comment
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface CommentRepository : JpaRepository<Comment, Long>, QuerydslPredicateExecutor<Comment> {

    fun findByUid(uid: String): Comment

    fun findByPostUid(postUid: String, pageable: Pageable): Page<Comment>
}