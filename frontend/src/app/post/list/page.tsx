import createClient from 'openapi-fetch'
import type { paths } from '@/lib/backend/apiV1/schema'

const client = createClient<paths>({
  baseUrl: 'http://localhost:8080',
})

export default async function Page({
  searchParams,
}: {
  searchParams: {
    searchKeywordType?: 'title' | 'content'
    searchKeyword?: string
  }
}) {
  const { searchKeyword = '', searchKeywordType = 'title' } = await searchParams

  const response = await client.GET('/api/v1/posts', {
    params: {
      query: {
        searchKeywordType,
        searchKeyword,
      },
    },
  })

  const responsBody = response.data!!

  return (
    <div>
      <form>
        <select name="searchKeywordType" defaultValue={searchKeywordType}>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input type="text" name="searchKeyword" defaultValue={searchKeyword} />
        <button type="submit">검색</button>
      </form>

      <div>
        <div>currentPageNumber: {responsBody.currentPageNumber}</div>

        <div>pageSize: {responsBody.pageSize}</div>

        <div>totalPages: {responsBody.totalPages}</div>

        <div>totalItems: {responsBody.totalItems}</div>
      </div>

      <hr />

      <ul>
        {responsBody.items.map((item) => (
          <li key={item.id} className="border-[2px] border-[gold] my-3">
            <div>id: {item.id}</div>
            <div>createDate: {item.createDate}</div>
            <div>modifyDate: {item.modifyDate}</div>
            <div>authorId: {item.authorId}</div>
            <div>authorName: {item.authorName}</div>
            <div>title: {item.title}</div>
            <div>published: {new String(item.published)}</div>
            <div>listed: {`${item.listed}`}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
