package dev.colearn.kshare.config

import dev.colearn.kshare.realm.support.RealmLoaderFilter
import dev.colearn.kshare.realm.support.RealmService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class FilterConfig : WebMvcConfigurer {

    @Autowired lateinit var  realmService: RealmService

    @Bean
    fun loadRealmFilterRegistration(): FilterRegistrationBean<RealmLoaderFilter>
    {
        var registration = FilterRegistrationBean<RealmLoaderFilter>(loadRealmFilter())
        registration.setName("RealmLoaderFilter")
        registration.addUrlPatterns("/api/*") // Url patterns should be the simple format, not the ant pattern
//        registration.addUrlPatterns("/api/v1/{realmId:\\w+}/**")
        //registration.addInitParameter("paramName", "paramValue");
        registration.setOrder(Ordered.HIGHEST_PRECEDENCE)

        System.out.println ("RealmLoaderFilter registered!!")

        return registration
    }

    @Bean
    fun loadRealmFilter() : RealmLoaderFilter {
        return RealmLoaderFilter(realmService)
    }
}
