import {useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Write from "./write";



const submitTest = () => {
    axios.get('/api', {}).then(() => {
        alert('등록성공')
    })
}

function BoardList() {
    const navigate = useNavigate();

    const moveHandler = () => {
        navigate('/write');
    }
    

    const [isChecked, setIsChecked] = useState([]);
    const [listData, setListData] = useState([]);

    const handleChecked = (checked, id) => {
        if(checked){
            setIsChecked([...isChecked, id]);
        } else {
            setIsChecked(isChecked.filter(v => v !== id));
        }
    }

    const deleteToData = () => {
        axios.post('/api/delete', {
            id : isChecked
        }).then((res) => {
            alert('선택하신 글이 삭제가 완료되었습니다.');
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

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
                                <input type={"checkBox"} 
                                       value={v.BOARD_ID}
                                       onChange={e => {
                                                        handleChecked(e.currentTarget.checked, v.BOARD_ID)
                                                    }
                                                }
                                       checked={isChecked.includes(v.BOARD_ID) ? true : false}>
                                </input>
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
        <Button variant="info" onClick={moveHandler}>글쓰기</Button>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger" onClick={deleteToData}>삭제하기</Button>
        </div>
    );
}

export default BoardList;