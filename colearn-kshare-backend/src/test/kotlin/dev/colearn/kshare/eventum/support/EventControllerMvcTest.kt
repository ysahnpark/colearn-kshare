package dev.colearn.kshare.eventum.support

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.realm.support.RealmService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.time.Instant

// @see https://spring.io/guides/tutorials/spring-boot-kotlin/
@WebMvcTest
class EventControllerMvcTest(
        @Autowired val mockMvc: MockMvc
) {

    val objectMapper = jacksonObjectMapper()

    @MockBean
    private lateinit var realmService: RealmService

    @MockBean
    private lateinit var eventService: EventService

    @BeforeEach
    private fun setup() {
        // https://github.com/FasterXML/jackson-modules-java8
        objectMapper.findAndRegisterModules()
    }


    @Test
    fun `when_get_return_event`() {

        val stubResponse = Event(title = "E1", type = "A", start = Instant.parse("2019-01-02T12:00:00.00Z"), end = Instant.parse("2019-01-02T13:00:00.00Z"), presenters = setOf("Jane", "John"))

        val testUid = "TEST-UID1"
        Mockito.`when`(eventService.find(testUid)).thenReturn(stubResponse)

        // Similar API? org.springframework.mock.http.server.reactive.MockServerHttpRequest
        mockMvc.perform(get("/api/v1/MyRealm/events/$testUid")
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_UTF8_VALUE)
        ).andDo(MockMvcResultHandlers.print())
                .andExpect(status().is2xxSuccessful)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect { it ->
                    val actual = objectMapper.readValue<Event>(it.response.contentAsString)
                    assertThat(actual).isEqualToComparingFieldByFieldRecursively(stubResponse)
                }
                // Also possible by using jsonPath
                .andExpect(jsonPath("\$.title").value(stubResponse.title))
                .andExpect(jsonPath("\$.start").value(stubResponse.start.toString()))

        // Optionally test the interaction with service
        verify(eventService).find(testUid)
    }


}