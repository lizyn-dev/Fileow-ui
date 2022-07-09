import React from "react";
import {SingleItem} from "../single-item/SingleItem";
import {Item} from "semantic-ui-react";

interface MainListProps {
  data: ApiTypes.Item[],
  displayRemove: boolean
}

export const MainList: React.FC<MainListProps> = (props: MainListProps) => {
  return (
    <Item.Group divided>
      {props.data.map(x => {
        return (
          <SingleItem key={x.id} data={x} displayRemove={props.displayRemove}/>
        )
      })}
    </Item.Group>
  )
}
