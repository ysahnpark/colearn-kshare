package dev.colearn.kshare.realm.support

import dev.colearn.kshare.realm.Realm
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/realms")
class RealmController @Autowired constructor(val realmService: RealmService) {

    @GetMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getRealms(@RequestParam(required = false) types: Set<String>?,
                  @PageableDefault(size = 20) pageable: Pageable): Page<Realm> {

        return realmService.findAll(types, pageable)
    }

    @GetMapping(value = ["/{id}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getRealm(@PathVariable id: String): Realm? {
        return realmService.findByKey(id) ?: realmService.find(id)
    }

    @PostMapping(value = [""], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun addRealm(@RequestBody realm: Realm): Realm {
        return realmService.add(realm)
    }

    @PutMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun updateRealm(@PathVariable uid: String, @RequestBody realm: Realm): Realm? {
        realm.uid = uid
        return realmService.update(realm)
    }

    @DeleteMapping(value = ["/{uid}"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun deleteRealm(@PathVariable uid: String): Realm {
        return realmService.deleteByUid(uid)
    }
}