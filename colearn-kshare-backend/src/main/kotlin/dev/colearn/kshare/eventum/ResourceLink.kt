package dev.colearn.kshare.eventum

import dev.colearn.kshare.framework.EntityBase
import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "resource_link")
class ResourceLink(

        @Column(name = "event_uid") // E.g. "video"
        var eventUid: String? = null,

        @Column(name = "kind") // E.g. poster, video, deck
        val kind: String,

        @Column(name = "media_type") // E.g. youtube, google slides
        val mediaType: String,

        @Column(name = "name")
        val name: String,

        @Column(name = "uri")
        val uri: String

) : EntityBase(), Serializable {
}