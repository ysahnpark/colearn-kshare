package dev.colearn.kshare.realm

import dev.colearn.kshare.framework.EntityBase
import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "realm")
data class Realm(

        @Column(name = "key")
        var key: String,

        @Column(name = "name")
        var name: String,

        @Column(name = "synopsis")
        var synopsis: String? = null,

        @Column(name = "description")
        var description: String? = null,

        @Column(name = "type")
        var type: String? = null, // Learning

        @Column(name = "status")
        var status: String = "", // active, inactive

        @Column(name = "audience")
        var audience: String? = null,

        @Column(name = "location")
        var location: String? = null,

        @Column(name = "country")
        var country: String? = null,

        @Column(name = "language")
        var language: String? = null,

        @Column(name = "link")
        var link: String? = null,

        @Column(name = "card_image")
        var cardImage: String? = null, // square image used on icons. Up to 300 x 300

        @Column(name = "cover_image")
        var coverImage: String? = null, // rectangular image used for cover.

        @Column(name = "config")
        var config: String? = null, // config in JSON

        // System populated
        @Column(name = "forum_uid")
        var forumUid: String? = null // Forum associated with this realm
) : EntityBase(), Serializable {

}