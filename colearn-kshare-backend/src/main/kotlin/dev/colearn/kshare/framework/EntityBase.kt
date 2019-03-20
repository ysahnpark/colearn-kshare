package dev.colearn.kshare.framework

import org.hibernate.annotations.GenericGenerator
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.io.Serializable
import java.time.Instant
import java.util.*
import javax.persistence.*


@MappedSuperclass
open class EntityBase(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var sid: Long? = null,

        @GeneratedValue(generator = "UUID")
        @GenericGenerator(
                name = "UUID",
                strategy = "org.hibernate.id.UUIDGenerator"
        )
        @Column(name = "uid", updatable = false, nullable = false)
        var uid: String? = null,

        @Column(name = "crated_at")
        @CreatedDate
        var createdAt: Instant = Instant.now(),

        @Column(name = "updated_at")
        @LastModifiedDate
        var updatedAt: Instant? = null

) : Serializable {

    @PrePersist
    fun prePersist() {
        if (uid == null) {
            uid = UUID.randomUUID().toString();
        }
    }

    @PreUpdate
    fun preUpdate() {
        updatedAt = Instant.now()
    }
}