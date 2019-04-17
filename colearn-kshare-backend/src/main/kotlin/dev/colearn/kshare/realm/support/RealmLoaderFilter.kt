package dev.colearn.kshare.realm.support

import org.springframework.util.AntPathMatcher
import org.springframework.web.servlet.HandlerMapping
import org.springframework.web.util.pattern.PathPatternParser
import javax.servlet.*
import javax.servlet.http.HttpServletRequest


class RealmLoaderFilter(val realmService: RealmService) : Filter {

    companion object {
        const val REALM_ATTRIB = "_realm_"
        const val REALM_ID = "realmId"
        const val PATH_PATTERN = "/api/v1/{$REALM_ID:\\w+}/**"
    }

    override fun init(filterConfig: FilterConfig?) {
        super.init(filterConfig)
        System.out.println ("RealmLoaderFilter.init called")
    }


    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {

        System.out.println ("RealmLoaderFilter.doFilter called")
        val realmId = extractRealmIdFromPath(request!!)

        if (realmId != null) {
            val realm = realmService.findByKey(realmId)
            // TODO: set Realm object in the RealmContextHolder
            request!!.setAttribute(REALM_ATTRIB, realm)
        }

        chain!!.doFilter(request, response)
    }


    private fun extractRealmIdFromPath(request: ServletRequest): String? {

        val req = request as HttpServletRequest
        val apMatcher = AntPathMatcher()

        // TODO: return null if the pathParameter is actually "realms"
        return if (apMatcher.match(PATH_PATTERN, req.servletPath))
                apMatcher.extractUriTemplateVariables(PATH_PATTERN, req.servletPath).getOrDefault(REALM_ID, null)
            else null
    }
}