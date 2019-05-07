package dev.colearn.kshare.post.support

import dev.colearn.kshare.forum.Post
import dev.colearn.kshare.forum.support.ForumService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/{realmId}/forums/{forumUid}/posts")
class PostController @Autowired constructor(val forumService: ForumService) {

    @GetMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getPosts(@PathVariable(required = true) realmId: String,
                 @PathVariable(required = true) forumUid: String,
                 @PageableDefault(size = 20) pageable: Pageable?): Page<Post> {

        return forumService.findAllPosts(forumUid, pageable)
    }

    @GetMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getPost(@PathVariable(required = true) realmId: String,
                @PathVariable(required = true) forumUid: String,
                @PathVariable uid: String): Post? {
        return forumService.findPost(uid)
    }

    @PostMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun addPost(@PathVariable(required = true) realmId: String,
                @PathVariable(required = true) forumUid: String,
                @RequestBody post: Post): Post {
        return forumService.addPost(post)
    }

    @PutMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun updatePost(@PathVariable(required = true) realmId: String,
                   @PathVariable(required = true) forumUid: String,
                   @PathVariable uid: String, @RequestBody post: Post): Post? {
        post.uid = uid
        return forumService.updatePost(post)
    }

    @DeleteMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun deletePost(@PathVariable(required = true) realmId: String,
                   @PathVariable(required = true) forumUid: String,
                   @PathVariable uid: String): Post {
        return forumService.deletePostByUid(uid)
    }
}