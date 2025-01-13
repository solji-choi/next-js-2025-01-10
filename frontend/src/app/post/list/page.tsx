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
    pageSize?: number
    page?: number
  }
}) {
  const {
    searchKeyword = '',
    searchKeywordType = 'title',
    pageSize = 10,
    page = 1,
  } = await searchParams

  const response = await client.GET('/api/v1/posts', {
    params: {
      query: {
        searchKeywordType,
        searchKeyword,
        pageSize,
        page,
      },
    },
  })

  const responsBody = response.data!!

  return (
    <div>
      <form>
        <input type="hidden" name="page" value="1" />
        <select name="pageSize" defaultValue={pageSize}>
          <option disabled>페이당 행 수</option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <select name="searchKeywordType" defaultValue={searchKeywordType}>
          <option disabled>검색어 타입</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input
          type="text"
          name="searchKeyword"
          placeholder="검색어를 입력해주세요."
          defaultValue={searchKeyword}
        />
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
