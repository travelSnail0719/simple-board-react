import {useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";



const submitTest = () => {
    axios.get('/api', {}).then(() => {
        alert('등록성공')
    })
}

function BoardList() {

    const [listData, setListData] = useState([]);

    const getListData = async () => {
       await axios.get('/api/list').then(response => {
            setListData(response.data)
        })
    }

    useEffect(() => {
        getListData();
    }, []);
    
    return (
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>선택</th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                {
                    listData.map(v => {
                        return(
                            
                            <tr key={v.BOARD_ID}>
                            <td>
                                <input type={"checkBox"}></input>
                            </td>
                            <td>{v.BOARD_ID}</td>
                            <td>{v.BOARD_TITLE}</td>
                            <td>{v.REGISTER_ID}</td>
                            <td>{v.REGISTER_DATE}</td>
                            </tr>
                            
                        )
                    })
                }
               
            </tbody>
        </Table>
        <Button variant="info" onClick={submitTest}>글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
        </div>
    );
}

export default BoardList;