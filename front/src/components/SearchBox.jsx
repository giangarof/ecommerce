import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import{Form,Button} from 'react-bootstrap'



export default function SearchBox() {
    const navigate = useNavigate()
    const {keyword: urlKeyword} = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = () =>{
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            className='mr-sm-2 ml-sm-5'
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder='Seach Books ...'>
        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-2 mx-2'>Search</Button>
    </Form>
  )
}
