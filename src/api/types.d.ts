declare namespace ApiTypes {
  interface GetListRequest {
    channel: string
  }

  interface AddTextItemRequest {
    channel: string,
    title: string,
    text: string
  }

  interface GetDownloadLinkRequest {
    id: string
  }

  interface GetListResponse {
    list: Item[]
  }

  interface Item {
    id: string,
    type: 'text' | 'file',
    channel: string,
    updateTime: string,
    createTime: string
  }

  interface FileItem extends Item {
    filename: string,
    size: number,
  }

  interface TextItem extends Item{
    title: string,
    text: string,
  }
}
