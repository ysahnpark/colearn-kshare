package dev.colearn.kshare.realm.support

import dev.colearn.kshare.realm.Realm
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor
import org.springframework.stereotype.Repository

@Repository
interface RealmRepository : JpaRepository<Realm, Long>, QuerydslPredicateExecutor<Realm> {
    fun findByType(type: String): List<Realm>

    fun findByUid(uid: String): Realm?

    fun findByKey(key: String): Realm?
}