package dev.colearn.kshare.forum.support

import dev.colearn.kshare.forum.Post
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor

interface PostRepository : JpaRepository<Post, Long>, QuerydslPredicateExecutor<Post> {

    fun findByUid(uid: String): Post

    fun findByForumUid(forumUid: String, pageable: Pageable?): Page<Post>

    fun findByThreadUid(threadUid: String, pageable: Pageable?): Page<Post>
}