package dev.colearn.kshare.forum.support

import dev.colearn.kshare.forum.Forum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/{realmId}/forums")
class ForumController @Autowired constructor(val forumService: ForumService) {

    @GetMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getForums(@PathVariable(required = true) realmId: String,
                  @RequestParam(required = false) types: Set<String>?,
                  @PageableDefault(size = 20) pageable: Pageable): Page<Forum> {

        return forumService.findAllForums(realmId, types, pageable)
    }

    @GetMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getForum(@PathVariable(required = false) realmId: String,
                 @PathVariable uid: String): Forum? {
        return forumService.findForum(uid)
    }

    @PostMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun addForum(@PathVariable(required = false) realmId: String,
                 @RequestBody forum: Forum): Forum {
        return forumService.addForum(forum)
    }

    @PutMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun updateForum(@PathVariable(required = false) realmId: String,
                    @PathVariable uid: String, @RequestBody forum: Forum): Forum? {
        forum.uid = uid
        return forumService.updateForum(forum)
    }

    @DeleteMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun deleteForum(@PathVariable(required = false) realmId: String,
                    @PathVariable uid: String): Forum {
        return forumService.deleteForumByUid(uid)
    }
}