package dev.colearn.kshare.forum

import dev.colearn.kshare.framework.EntityBase
import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "forum")
data class Forum(

        @Column(name = "realm_uid")
        var realmUid: String? = null,

        @Column(name = "name")
        var name: String,

        @Column(name = "description")
        var description: String? = null,

        @Column(name = "type")
        var type: String? = null, // Discussion, Q&A, Event

        var accessibility: String? = null
        ) : EntityBase(), Serializable {

}