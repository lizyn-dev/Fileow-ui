import axios from "axios";
import { faker } from '@faker-js/faker'


export const generateTextList = (num: number) => {
  let list: ApiTypes.Item[] = []
  const channel = faker.random.word()
  for (let i = 0; i < num; ++i) {
    if (Math.random() < 0.5) {
      let o: ApiTypes.TextItem = {
        id: faker.datatype.uuid(),
        type: 'text',
        createTime: faker.datatype.datetime().toDateString(),
        updateTime: faker.datatype.datetime().toDateString(),
        channel: channel,
        title: faker.random.word(),
        text: faker.random.words(1000)
      }
      list.push(o as ApiTypes.Item)
    } else {
      let o: ApiTypes.FileItem = {
        id: faker.datatype.uuid(),
        type: 'file',
        createTime: faker.datatype.datetime().toDateString(),
        updateTime: faker.datatype.datetime().toDateString(),
        channel: channel,
        filename: faker.random.word() + '.' + faker.system.commonFileExt(),
        size: Number((Math.random() * 1000).toFixed(0))
      }
      list.push(o as ApiTypes.Item)
    }
  }
  return list;
}

export const getList = (request: ApiTypes.GetListRequest) => {
  return axios.post('/api/item/getList', request);
}

export const addTextItem = (request: ApiTypes.AddTextItemRequest) => {
  return axios.post('/api/item/addTextItem', request);
}

export const addFileItem = (channel: string, file: Blob) => {
  const url = "/api/item/addFileItem";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("channel", channel)
  const config = {
    headers: {
      "Content-type": "multipart/form-data"
    }
  };
  return axios.post(url, formData, config);
}

export const getDownloadLink = (request: ApiTypes.GetDownloadLinkRequest) => {
  return axios.post('/api/item/getDownloadLink', request)
}
