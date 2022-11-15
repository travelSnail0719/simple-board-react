import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {useParams} from 'react-router-dom'
import Button from "react-bootstrap/Button";

function Deatil() {

  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    axios.get('/api/detail', {params : {id}})
        .then((res) => {
            setTitle(res.data[0].BOARD_TITLE);
            setContent(res.data[0].BOARD_CONTENT);
        })
        .catch(() => {
            console.log('불러오기 실패');
        })
  }, []);

  const update = () => {
    axios.post('/api/update', {
        title : title,
        content : content,
        id : id
    })
    .then((res) => {
        console.log(res);
        alert('수정 성공');
    })
    .catch((err) => {
        console.log(err.response.data);
    })
}

const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
}

const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
}

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="email" placeholder="제목을 입력하세요" defaultValue={title || ''} onChange={onTitleHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" placeholder="내용을 입력하세요" defaultValue={content || ''} onChange={onContentHandler}/>
                </Form.Group>
            </Form>
            <Button variant="info" onClick={update}>작성완료</Button>
        </div>
    );
}

export default Deatil;