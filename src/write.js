import { useState } from "react";
import Form from "react-bootstrap/Form";
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from 'axios';


function Write() {

    const navigate = useNavigate()

    const moveHandler = () => {
        navigate('/')
    }

    const [isModifyMode, setIsModifyMode] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    let state = {
        isModifyMode : isModifyMode,
        title : title,
        content : content
    };

    const isWrite = async () => {
        await axios.post('/api/write', {
            title : state.title,
            content : state.content
        })
        .then((res) => {
            console.log('res', res);
            alert('등록이 완료되었습니다.');
            navigate('/');
        })
        .catch((err) => {
            console.log('state1', state);
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
                    <Form.Control type="email" placeholder="제목을 입력하세요" value={title} onChange={onTitleHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" placeholder="내용을 입력하세요" value={content} onChange={onContentHandler}/>
                </Form.Group>
            </Form>
            <Button variant="info" onClick={isWrite}>작성완료</Button>
            <Button variant="secondary" onClick={moveHandler}>취소</Button>
        </div>
    );
}

export default Write;