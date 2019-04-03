package dev.colearn.kshare.eventum

import dev.colearn.kshare.framework.EntityBase
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode
import java.io.Serializable
import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "event")
data class Event(

        @Column(name = "title")
        var title: String,

        @Column(name = "synopsis")
        var synopsis: String? = null,

        @Column(name = "description")
        var description: String? = null,

        @Column(name = "type")
        var type: String? = null, // tech talk, open pane, etc.

        @Column(name = "start")
        var start: Instant,

        @Column(name = "end")
        var end: Instant,

        @ElementCollection
        @CollectionTable(name = "event_presenters",
                joinColumns = [JoinColumn(name = "event_uid", referencedColumnName = "uid")])
        @Fetch(FetchMode.JOIN)
        @Cascade(org.hibernate.annotations.CascadeType.DELETE)
//        @OrderColumn
        @Column(name = "presenter")
        var presenters: Set<String>? = null,

        @Column(name = "status")
        var status: String = "", // confirmed, tentative, etc

        @Column(name = "audience")
        var audience: String? = null,

        @Column(name = "level")
        var level: String? = null, // Beginner, intermediate, etc.

        @Column(name = "venue")
        var venue: String? = null,

        @Column(name = "link")
        var link: String? = null,

        @Column(name = "feedback")
        var feedback: String? = null, // Feedback link

        @OneToMany(cascade = [CascadeType.ALL])
        @JoinColumn(name = "event_uid")
        var resources: Set<ResourceLink> = setOf() // Feedback link
) : EntityBase(), Serializable {

}