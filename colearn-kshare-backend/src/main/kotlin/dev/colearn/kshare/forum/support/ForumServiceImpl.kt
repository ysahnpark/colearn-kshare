package dev.colearn.kshare.forum.support

import com.querydsl.core.BooleanBuilder
import dev.colearn.kshare.forum.Comment
import dev.colearn.kshare.forum.Forum
import dev.colearn.kshare.forum.Post
import dev.colearn.kshare.forum.QForum
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service


@Service
class ForumServiceImpl @Autowired constructor(
        val forumRepository: ForumRepository,
        val postRepository: PostRepository,
        val commentRepository: CommentRepository
) : ForumService {

    override
    fun findAllForums(realmUid: String, types: Set<String>?, page: Pageable): Page<Forum> {

        var booleanBuilder = BooleanBuilder()
        if (types != null && types.isNotEmpty()) {
            booleanBuilder.and(QForum.forum.type.`in`(types))
        }

        val sorting = if (page?.sort != null && page.sort.isSorted) page.sort else Sort.by(Sort.Direction.ASC, "start")
        var paging = if (page != null) PageRequest.of(page.pageNumber, page.pageSize, sorting)
        else PageRequest.of(0, 10, sorting)

        return forumRepository.findAll(booleanBuilder, paging)
    }

    override fun findForum(forumUid: String): Forum? {
        return forumRepository.findByUid(forumUid)
    }

    override
    fun addForum(forum: Forum): Forum {
        forum.sid = null
        forum.uid = null
        return forumRepository.save(forum)
    }

    override
    fun updateForum(forum: Forum): Forum {
        if (forum.uid == null) {
            throw IllegalArgumentException("UID not provided")
        }

        var foundForum = forumRepository.findByUid(forum.uid!!)
                ?: throw IllegalStateException("Forum [$forum.uid] Not Found")
        BeanUtils.copyProperties(forum, foundForum, "sid", "uid", "createdAt", "updatedAt")

        return forumRepository.save(foundForum)
    }

    override
    fun deleteForumByUid(forumUid: String): Forum {
        var foundForum = forumRepository.findByUid(forumUid) ?: throw IllegalStateException("Not Found: UID[$forumUid]")

        forumRepository.delete(foundForum)

        return foundForum
    }

    ////////// Posts //////////
    override
    fun findAllPosts(forumUid: String, page: Pageable?): Page<Post>
    {
        return postRepository.findByForumUid(forumUid, page)
    }

    override
    fun findAllPostsOfAThread(threadUid: String, page: Pageable): Page<Post>
    {
        return postRepository.findByThreadUid(threadUid, page)
    }

    override
    fun findPost(postUid: String): Post?
    {
        return postRepository.findByUid(postUid)
    }

    override
    fun addPost(post: Post): Post
    {
        post.sid = null
        post.uid = null
        return postRepository.save(post)
    }

    override
    fun updatePost(post: Post): Post
    {
        if (post.uid == null) {
            throw IllegalArgumentException("UID not provided")
        }

        var foundPost = postRepository.findByUid(post.uid!!)
                ?: throw IllegalStateException("Forum [$post.uid] Not Found")
        BeanUtils.copyProperties(post, foundPost, "sid", "uid", "createdAt", "updatedAt")

        return postRepository.save(foundPost)
    }

    override
    fun deletePostByUid(postUid: String): Post
    {
        var foundPost = postRepository.findByUid(postUid) ?: throw IllegalStateException("Not Found: UID[$postUid]")

        postRepository.delete(foundPost)

        return foundPost
    }

    ////////// Comments //////////
    override
    fun findAllComments(postUid: String, page: Pageable): Page<Comment>
    {
        return commentRepository.findByPostUid(postUid, page)
    }

    override
    fun findComment(commentUid: String): Comment?
    {
        return commentRepository.findByUid(commentUid)
    }

    override
    fun addComment(comment: Comment): Comment
    {
        comment.sid = null
        comment.uid = null
        return commentRepository.save(comment)
    }

    override
    fun updateComment(comment: Comment): Comment
    {
        if (comment.uid == null) {
            throw IllegalArgumentException("UID not provided")
        }

        var foundComment = commentRepository.findByUid(comment.uid!!)
                ?: throw IllegalStateException("Forum [$comment.uid] Not Found")
        BeanUtils.copyProperties(comment, foundComment, "sid", "uid", "createdAt", "updatedAt")

        return commentRepository.save(foundComment)
    }

    override
    fun deleteCommentByUid(commentUid: String): Comment
    {
        var foundComment = commentRepository.findByUid(commentUid) ?: throw IllegalStateException("Not Found: UID[$commentUid]")

        commentRepository.delete(foundComment)

        return foundComment
    }
}