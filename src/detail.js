import axios from "axios";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import {useLocation, useParams} from 'react-router-dom'

function Deatil() {

  const {id} = useParams();
  
  useEffect(() => {
    console.log('id', id);
    axios.get('/api/detail', {params : {id}})
        .then((res) => {
            console.log('resData', res.data);
            console.log('불러오기 성공');
        })
        .catch(() => {
            console.log('불러오기 실패');
        })
  }, []);

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="email" placeholder="제목을 입력하세요"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" placeholder="내용을 입력하세요" />
                </Form.Group>
            </Form>
        </div>
    );
}

export default Deatil;