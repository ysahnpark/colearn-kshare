package dev.colearn.kshare.realm.support

import dev.colearn.kshare.realm.Realm
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface RealmService {
    fun findAll(types: Set<String>? = null, page: Pageable): Page<Realm>
    fun find(realmUid: String): Realm?
    fun findByKey(realmKey: String): Realm?
    fun add(realm: Realm): Realm
    fun update(realm: Realm): Realm
    fun deleteByUid(realmUid: String): Realm

    companion object {
        const val HOST_KEY: String = "HOST"
    }
}