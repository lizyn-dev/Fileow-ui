import React, {useState} from "react";
import {Button, Icon, Item, Label} from "semantic-ui-react";
import style from "./TextItem.module.less";

interface TextItemProps {
  data: ApiTypes.TextItem,
  displayRemove: boolean
}

export const TextItem: React.FC<TextItemProps> = (props: TextItemProps) => {

  const textLengthLimit = 100

  const [displayAll, setDisplayAll] = useState<boolean>(false)

  const handleDescriptionClick = () => {
    if (!displayAll) {
      setDisplayAll(true)
    }
  }

  const briefText = (text: string) => {
    if (text.length <= textLengthLimit) {
      return (
        <div className={style.textSpan}>{text}</div>
      )
    } else {
      return (
        <div className={style.briefTextSpan}>{text.substring(0, textLengthLimit) + '...'}</div>
      )
    }
  }

  const allText = (text: string) => {
    return (
      <div className={style.textSpan}>{text}</div>
    )
  }

  return (
    <Item>
      <Item.Content verticalAlign='middle'>
        <Item.Header>{props.data.title}</Item.Header>
        <Item.Meta>
          <Label color='pink'>Text</Label>
          <Label color='blue'>{props.data.id}</Label>
          <Label>{props.data.createTime}</Label>
        </Item.Meta>
        <Item.Description onClick={handleDescriptionClick}>
          {displayAll ? allText(props.data.text) : briefText(props.data.text)}
        </Item.Description>
        {props.displayRemove &&
        <Item.Extra>
          <Button icon={<Icon className="trash alternate outline"/>} floated={"right"}/>
        </Item.Extra>
        }
      </Item.Content>
    </Item>
  )
}
