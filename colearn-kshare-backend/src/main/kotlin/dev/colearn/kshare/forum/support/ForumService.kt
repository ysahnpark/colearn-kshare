package dev.colearn.kshare.forum.support

import dev.colearn.kshare.forum.Comment
import dev.colearn.kshare.forum.Forum
import dev.colearn.kshare.forum.Post
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface ForumService {
    fun findAllForums(realmUid: String, types: Set<String>? = null, page: Pageable): Page<Forum>
    fun findForum(forumUid: String): Forum?
    fun addForum(forum: Forum): Forum
    fun updateForum(forum: Forum): Forum
    fun deleteForumByUid(forumUid: String): Forum
    
    fun findAllPosts(forumUid: String, page: Pageable?): Page<Post>
    fun findAllPostsOfAThread(threadUid: String, page: Pageable): Page<Post>
    fun findPost(postUid: String): Post?
    fun addPost(post: Post): Post
    fun updatePost(post: Post): Post
    fun deletePostByUid(postUid: String): Post

    fun findAllComments(postUid: String, page: Pageable): Page<Comment>
    fun findComment(commentUid: String): Comment?
    fun addComment(comment: Comment): Comment
    fun updateComment(comment: Comment): Comment
    fun deleteCommentByUid(commentUid: String): Comment
}