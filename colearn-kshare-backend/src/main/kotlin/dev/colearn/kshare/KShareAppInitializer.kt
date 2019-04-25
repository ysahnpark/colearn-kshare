package dev.colearn.kshare

import dev.colearn.kshare.realm.Realm
import dev.colearn.kshare.realm.support.RealmService
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

private val logger = KotlinLogging.logger {}

@Component
class KShareAppInitializer @Autowired constructor(
        val realmService: RealmService
): ApplicationRunner {

    override fun run(args: ApplicationArguments?) {

        logger.info("Initializing Application")

        val hostRealm = realmService.findByKey(RealmService.HOST_KEY)

        if (hostRealm == null) {
            logger.info ("Default Realm not found, creating one...")
            val defaultReal = Realm(key=RealmService.HOST_KEY, name = "Host",
                    synopsis = "Host realm", description= " Generated at Site initialization")
            realmService.add(defaultReal)
        }

    }

}