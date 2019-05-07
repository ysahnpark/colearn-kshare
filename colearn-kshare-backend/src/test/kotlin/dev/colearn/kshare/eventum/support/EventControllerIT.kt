package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageRequest
import java.time.Instant
import org.springframework.test.web.servlet.MockMvc
import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.Matchers.any
import org.mockito.Mockito
import org.mockito.Mockito.verify
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

// @see https://spring.io/guides/tutorials/spring-boot-kotlin/

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EventControllerIT (
        @Autowired val restTemplate: TestRestTemplate,
        //@Autowired val mockMvc: MockMvc,
        @Autowired val objectMapper: ObjectMapper
) {

    @MockBean
    private lateinit var eventService: EventService


    @Test
    fun `using_rest_when_get_return_event`() {

        val stubResponse = Event(title = "E1", type = "A", start = Instant.parse("2019-01-02T12:00:00.00Z"), end = Instant.parse("2019-01-02T13:00:00.00Z"), presenters = setOf("Jane", "John"))

        val testUid = "TEST-UID1"
        Mockito.`when`(eventService.find(testUid, true)).thenReturn(stubResponse)

         val entity = restTemplate.getForEntity("/api/v1/MyRealm/events/$testUid", Event::class.java)
        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(entity.body).isEqualToComparingFieldByFieldRecursively(stubResponse)
    }

}