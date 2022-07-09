import React, {ChangeEvent, useEffect, useState} from "react";
import {Input} from "semantic-ui-react";
import style from './ChannelBar.module.less';

interface ChannelBarProps {
  handler?: (value: string) => void,
}

export const ChannelBar = (props: ChannelBarProps) => {

  const defaultValue = 'fileow';

  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  useEffect(() => {
    if (props.handler) {
      props.handler(value);
    }
  }, [value])

  return (
    <Input
      className={style.input}
      value={value}
      label="Channel"
      onChange={handleChange}
    />
  )
}
