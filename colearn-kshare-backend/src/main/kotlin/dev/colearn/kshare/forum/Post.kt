package dev.colearn.kshare.forum

import dev.colearn.kshare.framework.EntityBase
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "forum_post")
data class Post(

        @Column(name = "forum_uid")
        var forumUid: String,

        @Column(name = "thread_uid")
        var threadUid: String? = null, // the post Uid that this is responding to

        @Column(name = "title")
        var title: String,

        @Column(name = "body")
        var body: String? = null,

        @Column(name = "type")
        var type: String? = null, // Response, Answer

        @Column(name = "vote_count")
        var voteCount: Int = 0,

        @Column(name = "vote")
        var vote: Int = 0,

        // Not persisted, Loaded upon request
        @Transient
        var threadPosts: Page<Post> = PageImpl<Post>(listOf())

) : EntityBase(), Serializable {

}