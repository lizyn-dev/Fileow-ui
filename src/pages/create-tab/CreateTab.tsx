import React, {ChangeEvent, createRef, FormEvent, useState} from "react";
import {
  Button,
  Card,
  Dimmer,
  Form,
  Icon,
  Loader,
  Tab
} from "semantic-ui-react";
import {addFileItem, addTextItem} from "../../api";
import {AxiosError, AxiosResponse} from "axios";

interface AddCardProps {
  channel: string,
  itemCreateHandler: () => void
}

export const CreateTab: React.FC<AddCardProps> = (props: AddCardProps) => {
  
  const errorDisplayTime = 500

  const [loading, setLoading] = useState<boolean>(false)

  const [ok, setOk] = useState<boolean>(false)

  const [error, setError] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')

  const loadingDimer = (
    <Dimmer active={loading || ok || error}>
      {ok && <div> <Icon size='big' className='check circle' color='green'/> <span>{message}</span></div>}
      {error && <div> <Icon size='big' className='times circle outline' color='red'/> <span>{message}</span> </div>}
      {loading  && <Loader/>}
    </Dimmer>
  )

  const handleResponse = (res: AxiosResponse) => {
    setLoading(false)
    if (res.data.code === 200) {
      setOk(true)
      setMessage('OK')
      setTimeout(() => {
        setOk(false)
      }, errorDisplayTime)
      props.itemCreateHandler()
    } else {
      setError(true)
      setMessage(res.data.message)
      setTimeout(() => {
        setError(false)
      }, errorDisplayTime)
    }
  }

  const handleError = (err: AxiosError) => {
    setLoading(false)
    setError(true)
    setMessage(err.message)
    setTimeout(() => {
      setError(false)
    }, errorDisplayTime)
  }

  /* start file card*/

  const fileInputRef = createRef<HTMLInputElement>()

  const fileChange = (e: any) => {
    if (e.target.files.length == 0) {
      return
    }
    setLoading(true)
    addFileItem(
      props.channel,
      e.target.files[0]
    ).then(res => {
      handleResponse(res)
    }).catch(err => {
      handleError(err)
    })
  }

  const fileCard = () => (
    <Card>
      {loadingDimer}
      <Card.Content>
        <Button
          content="Choose File"
          icon="file"
          onClick={() => {
            if (fileInputRef.current) fileInputRef.current.click()
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={fileChange}
        />
      </Card.Content>
    </Card>
  )

  /* end file card */

  /* start text card */

  const [text, setText] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTextSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    addTextItem({
      channel: props.channel,
      title: title,
      text: text
    }).then(res => {
      handleResponse(res)
      setText('')
      setTitle('')
    }).catch((err) => {
      handleError(err)
    })
  }

  const textCard = () => (
    <Card>
      {loadingDimer}
      <Card.Content>
        <Form onSubmit={handleTextSubmit}>
          <Form.Field>
            <Form.Input label='Text' type='text' value={title} onChange={handleTitleChange}/>
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Text' rows={7} value={text} onChange={handleTextChange}/>
          </Form.Field>
          <Form.Field>
            <Button primary type='submit'>Submit</Button>
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
  )

  /* end text Card */

  const panes = [
    {
      menuItem: 'Text',
      render: textCard
    },
    {
      menuItem: 'File',
      render: fileCard
    }
  ]

  return (
    <Tab panes={panes}/>
  )
}

