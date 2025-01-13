type PostDto = {
  id: number
  createDate: string
  modifyDate: string
  authorId: number
  authorName: string
  title: string
  published: boolean
  listed: boolean
}

type PostItemPageDto = {
  currentPageNumber: number
  pageSize: number
  totalPages: number
  totalItems: number
  items: PostDto[]
}

export default async function Page() {
  const response = await fetch('http://localhost:8080/api/v1/posts')
  const body: PostItemPageDto = await response.json()

  return (
    <div>
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
