package dev.colearn.kshare.post.support

import dev.colearn.kshare.forum.Comment
import dev.colearn.kshare.forum.support.ForumService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/{realmId}/forums/{forumUid}/posts/{postUid}/comments")
class CommentController @Autowired constructor(val forumService: ForumService) {

    @GetMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getComments(@PathVariable(required = true) realmId: String,
                 @PathVariable(required = true) forumUid: String,
                 @PathVariable(required = true) postUid: String,
                 @PageableDefault(size = 20) pageable: Pageable): Page<Comment> {

        return forumService.findAllComments(postUid, pageable)
    }

    @GetMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getComment(@PathVariable(required = true) realmId: String,
                @PathVariable(required = true) forumUid: String,
                @PathVariable(required = true) postUid: String,
                @PathVariable uid: String): Comment? {
        return forumService.findComment(uid)
    }

    @PostMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun addComment(@PathVariable(required = true) realmId: String,
                @PathVariable(required = true) forumUid: String,
                @PathVariable(required = true) postUid: String,
                @RequestBody comment: Comment): Comment {
        return forumService.addComment(comment)
    }

    @PutMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun updateComment(@PathVariable(required = true) realmId: String,
                   @PathVariable(required = true) forumUid: String,
                   @PathVariable(required = true) postUid: String,
                   @PathVariable uid: String, @RequestBody comment: Comment): Comment? {
        comment.uid = uid
        return forumService.updateComment(comment)
    }

    @DeleteMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun deleteComment(@PathVariable(required = false) realmId: String,
                   @PathVariable(required = true) forumUid: String,
                   @PathVariable(required = true) postUid: String,
                   @PathVariable uid: String): Comment {
        return forumService.deleteCommentByUid(uid)
    }
}