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
        val title: String,

        @Column(name = "synopsis")
        val synopsis: String? = null,

        @Column(name = "description")
        val description: String? = null,

        @Column(name = "type")
        val type: String? = null, // tech talk, open pane, etc.

        @Column(name = "start")
        val start: Instant,

        @Column(name = "end")
        val end: Instant,

        @ElementCollection
        @CollectionTable(name = "event_presenters",
                joinColumns = [JoinColumn(name = "event_uid", referencedColumnName = "uid")])
        @Fetch(FetchMode.JOIN)
        @Cascade(org.hibernate.annotations.CascadeType.DELETE)
//        @OrderColumn
        @Column(name = "presenter")
        val presenters: Set<String>? = null,

        @Column(name = "status")
        val status: String = "", // confirmed, tentative, etc

        @Column(name = "audience")
        val audience: String? = null,

        @Column(name = "level")
        val level: String? = null, // Beginner, intermediate, etc.

        @Column(name = "venue")
        val venue: String? = null,

        @Column(name = "link")
        val link: String? = null,

        @Column(name = "feedback")
        val feedback: String? = null, // Feedback link

        @OneToMany(cascade = [CascadeType.ALL])
        @JoinColumn(name = "event_uid")
        var resources: Set<ResourceLink> = setOf() // Feedback link
) : EntityBase(), Serializable {

}