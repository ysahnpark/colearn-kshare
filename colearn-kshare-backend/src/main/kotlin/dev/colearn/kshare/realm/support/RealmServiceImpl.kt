package dev.colearn.kshare.realm.support

import com.querydsl.core.BooleanBuilder
import dev.colearn.kshare.forum.Forum
import dev.colearn.kshare.forum.support.ForumService
import dev.colearn.kshare.realm.QRealm
import dev.colearn.kshare.realm.Realm
import org.springframework.beans.BeanUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service


@Service
class RealmServiceImpl @Autowired constructor(
        val realmRepository: RealmRepository,
        val forumService: ForumService
) : RealmService {

    override
    fun findAll(types: Set<String>?, page: Pageable): Page<Realm> {

        var booleanBuilder = BooleanBuilder()
        if (types != null && types.isNotEmpty()) {
            booleanBuilder.and(QRealm.realm.type.`in`(types))
        }

        val sorting = if (page?.sort != null && page.sort.isSorted) page.sort else Sort.by(Sort.Direction.ASC, "name")
        var paging = if (page != null) PageRequest.of(page.pageNumber, page.pageSize, sorting)
        else PageRequest.of(0, 10, sorting)

        return realmRepository.findAll(booleanBuilder, paging)
    }

    override fun find(realmUid: String): Realm? {
        return realmRepository.findByUid(realmUid)
    }

    override fun findByKey(realmKey: String): Realm? {
        return realmRepository.findByKey(realmKey)
    }

    override
    fun add(realm: Realm): Realm {
        realm.sid = null
        realm.uid = null
        val savedRealm = realmRepository.save(realm)

        val eventForum = Forum(realmUid = savedRealm.uid, name=realm.name)
        val savedEventForum = forumService.addForum(eventForum)
        realm.forumUid = savedEventForum.uid

        return savedRealm
    }

    override
    fun update(realm: Realm): Realm {
        if (realm.uid == null) {
            throw IllegalArgumentException("UID not provided")
        }

        var foundRealm = realmRepository.findByUid(realm.uid!!)
                ?: throw IllegalStateException("Realm [$realm.uid] Not Found")
        BeanUtils.copyProperties(realm, foundRealm, "sid", "uid", "createdAt", "updatedAt")

        return realmRepository.save(foundRealm)
    }

    override
    fun deleteByUid(realmUid: String): Realm {
        var foundRealm = realmRepository.findByUid(realmUid) ?: throw IllegalStateException("Not Found: UID[$realmUid]")

        realmRepository.delete(foundRealm)

        return foundRealm
    }
}