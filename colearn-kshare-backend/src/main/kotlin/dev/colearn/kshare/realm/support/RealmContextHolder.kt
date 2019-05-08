package dev.colearn.kshare.realm.support

import dev.colearn.kshare.realm.Realm


// @see: https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/core/context/SecurityContextHolder.java
// @reference: https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/core/context/ThreadLocalSecurityContextHolderStrategy.java
object RealmContextHolder {
    private val realmHolder = ThreadLocal<Realm>()

    fun clearRealm() {
        realmHolder.remove()
    }

    fun getRealm(): Realm {
        val realm = realmHolder.get()
        return realm
    }

    fun setRealm(realm: Realm) {
        realmHolder.set(realm)
    }
}