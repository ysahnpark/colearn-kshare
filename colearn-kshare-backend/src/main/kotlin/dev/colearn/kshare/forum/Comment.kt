package dev.colearn.kshare.forum

import dev.colearn.kshare.framework.EntityBase
import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "forum_comment")
data class Comment(

        @Column(name = "post_uid")
        var postUid: String,

        @Column(name = "body")
        var body: String? = null,

        @Column(name = "type")
        var type: String? = null, //

        @Column(name = "voteCount")
        var voteCount: Int = 0,

        @Column(name = "vote")
        var vote: Int = 0

        ) : EntityBase(), Serializable {

}