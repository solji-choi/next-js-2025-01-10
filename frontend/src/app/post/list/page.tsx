import type { components } from '@/lib/backend/apiV1/schema'

type PostDto = components['schemas']['PostDto']
type PageDtoPostDto = components['schemas']['PageDtoPostDto']

export default async function Page({
  searchParams,
}: {
  searchParams: {
    searchKeywordType?: 'title' | 'content'
    searchKeyword?: string
  }
}) {
  const { searchKeyword = '', searchKeywordType = 'title' } = await searchParams

  const response = await fetch(
    `http://localhost:8080/api/v1/posts?searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`,
  )
  const body: PageDtoPostDto = await response.json()

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
        <div>currentPageNumber: {body.currentPageNumber}</div>

        <div>pageSize: {body.pageSize}</div>

        <div>totalPages: {body.totalPages}</div>

        <div>totalItems: {body.totalItems}</div>
      </div>

      <hr />

      <ul>
        {body.items.map((item: PostDto) => (
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
