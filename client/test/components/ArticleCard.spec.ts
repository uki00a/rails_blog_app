import ArticleCard from "~/components/ArticleCard.vue"
import { renderWithVuetify } from "~/test/utils"

test("ArticleCard", () => {
  const { getByText } = renderWithVuetify(ArticleCard, {
    props: {
      article: {
        id: 1,
        title: "foo",
        body: "bar",
        createdAt: new Date(),
        user: { id: 1, name: "baz" },
      }
    }
  })
  // TODO Use @testing-library/jest-dom
  expect(getByText("foo")).toBeTruthy()
  expect(getByText(/@baz/)).toBeTruthy()
})