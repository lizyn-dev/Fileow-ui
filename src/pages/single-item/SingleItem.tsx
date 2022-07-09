import React from "react";
import {TextItem} from "./text-item/TextItem";
import {FileItem} from "./file-item/FileItem";

interface SingleItemProps {
  data: ApiTypes.Item,
  displayRemove: boolean
}

export const SingleItem: React.FC<SingleItemProps> = (props: SingleItemProps) => {
  return (
    <>
      {props.data.type === 'text' ?
        <TextItem data={props.data as ApiTypes.TextItem} displayRemove={props.displayRemove}/> :
        <FileItem data={props.data as ApiTypes.FileItem} displayRemove={props.displayRemove}/>}
    </>
  )
}
