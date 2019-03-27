package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.eventum.QEvent
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.boot.test.context.SpringBootTest
import java.time.Instant
import javax.transaction.Transactional

//@ExtendWith(SpringExtension::class)
// Not needed as per @see https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html#boot-features-testing-spring-boot-applications
@Transactional
@SpringBootTest(
        classes = [
            TestEntityManager::class
        ]
)
@EntityScan("dev.colearn.kshare.eventum")
@EnableAutoConfiguration
class EventRepositoryIT constructor(
) {

    @Autowired
    lateinit var subject: EventRepository
    @Autowired
    lateinit var entityManager: TestEntityManager

    @Test
    fun `when_crud_then_success`() {
        populate()

        val result = subject.findByType("A")

        assertThat(result).hasSize(2)
    }

    @Test
    fun `when_query_withqdsl_then_success`() {
        populate()

        val predicate = QEvent.event.type.eq("B").or(QEvent.event.title.eq("E1"))
        val result = subject.findAll(predicate)

        val titles = result.map { it -> it.title }.toCollection(ArrayList())

        assertThat(result).hasSize(4)
        assertThat(titles).containsExactlyInAnyOrder("E1", "E3", "E4", "E5")
    }

    @Test
    fun `when_queryOneWithPresenters_then_success`() {
        val start = Instant.now()
        val events = populate()

        val predicate = QEvent.event.title.eq("E1")
        val result = subject.findAll(predicate)


        val end = Instant.now()
        assertThat(result.first().presenters).containsExactlyInAnyOrder("Jane", "John")
        System.out.println(result.first().createdAt)
        assertThat(result.first().createdAt).isBetween(start, end)
        assertThat(result.first().updatedAt).isNull()
    }

    fun populate(): List<Event> {

        var savedEvents = mutableListOf<Event>()

        val events = arrayListOf(
                Event(title = "E1", type = "A", start = Instant.now(), end = Instant.now(), presenters = setOf("Jane", "John")),
                Event(title = "E2", type = "A", start = Instant.now(), end = Instant.now()),
                Event(title = "E3", type = "B", start = Instant.now(), end = Instant.now()),
                Event(title = "E4", type = "B", start = Instant.now(), end = Instant.now()),
                Event(title = "E5", type = "B", audience = "engineer", start = Instant.now(), end = Instant.now())
        )

        events.map {
            savedEvents.add(entityManager.persist(it))
        }

        return savedEvents
    }
}