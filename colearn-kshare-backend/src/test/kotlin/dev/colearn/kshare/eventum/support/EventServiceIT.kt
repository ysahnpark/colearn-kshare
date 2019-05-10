package dev.colearn.kshare.eventum.support

import dev.colearn.kshare.eventum.Event
import dev.colearn.kshare.forum.Post
import dev.colearn.kshare.forum.support.ForumService
import dev.colearn.kshare.realm.Realm
import dev.colearn.kshare.realm.support.RealmContextHolder
import dev.colearn.kshare.realm.support.RealmService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import java.time.Instant
import javax.transaction.Transactional

private fun <T> anyObject(): T {
    return Mockito.anyObject<T>()
}

//@ExtendWith(SpringExtension::class)
// Not needed as per @see https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html#boot-features-testing-spring-boot-applications
@Transactional
@SpringBootTest(
        classes = [
            TestEntityManager::class,
            EventServiceImpl::class
        ]
)
@EntityScan("dev.colearn.kshare.eventum")
@EnableAutoConfiguration
class EventServiceIT constructor(
) {

    @Autowired
    lateinit var subject: EventServiceImpl
    @Autowired
    lateinit var entityManager: TestEntityManager

    @MockBean
    private lateinit var realmService: RealmService
    @MockBean
    private lateinit var forumService: ForumService

    @Test
    fun `when_add_then_create_associated_post`() {

        // GIVEN
        val stubRealm = Realm(key="STUB_REALM", name="Stub_Realm", forumUid="STUB_FORUM_ID")
        // Mockito.`when`(realmService.findByKey(anyObject())).thenReturn(stubRealm)
        RealmContextHolder.setRealm(stubRealm)

        val stubPost = Post("STUB_FORUM_ID", title="Stub_post")
        stubPost.uid = "POST_UID"
        Mockito.`when`(forumService.addPost(anyObject())).thenReturn(stubPost)

        // WHEN
        val event = Event("TEST_REALM", "Test Title", "Testing", "This is a test", "Test", Instant.parse("2019-01-12T12:00:00.00Z"), Instant.parse("2019-01-12T12:00:00.00Z"))
        val result = subject.add(event)

        // THEN
        assertThat(result.postThreadUid).isEqualTo(stubPost.uid)
    }

    @Test
    fun `when_find_then_load_posts`() {

        val firstEvent = populate().first()!!

        val stubThreadPosts = listOf(Post("STUB_FORUM_ID", title="Stub_post"))
        var stubPost = Post("STUB_FORUM_ID", title="Stub_title", threadPosts = PageImpl<Post>(stubThreadPosts))
        Mockito.`when`(forumService.findPost(anyObject())).thenReturn(stubPost)

        val result = subject.find(firstEvent.uid!!, true)

        assertThat(result!!.uid).isEqualTo(firstEvent.uid)
        assertThat(result!!.post!!.threadPosts).hasSize(1)
        assertThat(result!!.post!!.threadPosts.first().title).isEqualTo("Stub_post")
    }

    @Test
    fun `when_query_with_params_null`() {
        populate()

        val page = PageRequest.of(0, 10)
        val result = subject.findAll(null, null, null, page)

        val titles = result.map { it -> it.title }.toCollection(ArrayList())

        assertThat(result).hasSize(5)
    }


    @Test
    fun `when_query_with_type_A`() {
        populate()

        val page = PageRequest.of(0, 10)
        val result = subject.findAll(setOf("A"), null, null, page)

        val titles = result.map { it -> it.title }.toCollection(ArrayList())

        assertThat(result).hasSize(2)
        assertThat(titles).containsExactly("E1", "E2")
    }

    @Test
    fun `when_query_with_from_0112019`() {
        populate()

        val page = PageRequest.of(0, 10)
        val result = subject.findAll(null, Instant.parse("2019-01-12T12:00:00.00Z"), null, page)

        val titles = result.map { it -> it.title }.toCollection(ArrayList())

        assertThat(result).hasSize(2)
        assertThat(titles).containsExactly("E4", "E5")
    }


    @Test
    fun `when_query_with_type_B_and_to_0113019`() {
        populate()

        val page = PageRequest.of(0, 10)
        val result = subject.findAll(setOf("B"), null, Instant.parse("2019-01-13T12:00:00.00Z"), page)

        val titles = result.map { it -> it.title }.toCollection(ArrayList())

        assertThat(result).hasSize(1)
        assertThat(titles).containsExactly("E3")
    }


    fun populate(): List<Event> {

        var savedEvents = mutableListOf<Event>()

        val events = arrayListOf(
                Event(title = "E5", type = "B", audience = "engineer", start = Instant.parse("2019-02-05T12:00:00.00Z"), end = Instant.parse("2019-02-05T13:00:00.00Z"), postThreadUid = "STUB_POST_ID"),
                Event(title = "E4", type = "B", start = Instant.parse("2019-02-03T12:00:00.00Z"), end = Instant.parse("2019-02-03T13:00:00.00Z")),
                Event(title = "E3", type = "B", start = Instant.parse("2019-01-12T12:00:00.00Z"), end = Instant.parse("2019-01-12T13:00:00.00Z")),
                Event(title = "E2", type = "A", start = Instant.parse("2019-01-09T12:00:00.00Z"), end = Instant.parse("2019-01-09T12:00:00.00Z")),
                Event(title = "E1", type = "A", start = Instant.parse("2019-01-02T12:00:00.00Z"), end = Instant.parse("2019-01-02T13:00:00.00Z"), presenters = setOf("Jane", "John"))
                )

        events.map {
            savedEvents.add(entityManager.persist(it))
        }

        return savedEvents
    }
}