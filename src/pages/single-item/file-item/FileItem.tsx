import React from "react";
import {Button, Icon, Item, Label} from "semantic-ui-react";
import style from './FileItem.module.less'
import {getDownloadLink} from "../../../api";

interface FileItemProps {
  data: ApiTypes.FileItem,
  displayRemove: boolean
}

export const FileItem: React.FC<FileItemProps> = (props: FileItemProps) => {

  const formatSize = (size: number) => {
    if (size < 1024) {
      return size + ' B'
    } else if (1024 <= size && size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB'
    } else if (1024 * 1024 <= size && size < 1024 * 1024 * 1024) {
      return (size / 1024 / 1024).toFixed(2) + ' MB'
    }
  }

  const download = () => {
    getDownloadLink({
      id: props.data.id
    }).then(res => {
      const a = document.createElement('a')
      a.setAttribute('href', res.data.data)
      a.click()
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <Item>
      <Item.Content verticalAlign='middle'>
        <Item.Header>
          <a className={style.downloadLink} onClick={download}>
            {props.data.filename}
          </a>
        </Item.Header>
        <Item.Meta>
          <Label color='green'>File</Label>
          <Label color='blue'>{props.data.id}</Label>
          <Label color='yellow'>{formatSize(props.data.size)}</Label>
          <Label>{props.data.createTime}</Label>
        </Item.Meta>
        {props.displayRemove &&
        <Item.Extra>
          <Button icon={<Icon className="trash alternate outline"/>} floated={"right"}/>
        </Item.Extra>
        }
      </Item.Content>
    </Item>
  )
}
