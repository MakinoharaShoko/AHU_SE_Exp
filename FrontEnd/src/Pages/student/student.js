import './student.css'
import {Descriptions, Button, Card} from 'antd';
import {deleteOne, runtime, setPostBody} from "../../Controller/runtime";
import {useEffect, useState} from "react";
import Delete from "../../Components/Delete/Delete";

const Student = (props)=>{
    const [count,setCount] = useState(0)
    useEffect(()=>{
        getStudentList();
    })
    if(count === 0){
        getStudentList();
    }

    let page = [];
    for (const studentListKey in runtime.studentList) {
        if(studentListKey.substring(0,3)==='Stu'){
            let detail = [];
            for (const detailKey in runtime.studentList[studentListKey]) {
                if(detailKey !== '_id'&& detailKey!=='Name'){
                    let temp = <Descriptions.Item label={detailKey}>{runtime.studentList[studentListKey][detailKey]}</Descriptions.Item>
                    detail.push(temp)
                }
            }
            let temp = <Descriptions
                bordered
                title={runtime.studentList[studentListKey]['Name']}
                size={'default'}
                extra={<Delete confirm={()=>{
                    deleteOne('Stu', runtime.studentList[studentListKey]['ID']);
                    setCount(count+1);}}/>}
            >
                {detail}
            </Descriptions>
            page.push(temp);
        }
    }
    return <div>
        {page}
    </div>

    function getStudentList(){
        runtime.studentList=[];
        let req = new XMLHttpRequest();
        req.open('POST',runtime.host+'/getinfo/');
        let sendBody = {table:'class',ID:runtime.currentClass};
        console.log(sendBody);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        req.send(setPostBody(sendBody));
        req.onreadystatechange = ()=>{
            if(req.readyState === 4 && req.status === 200){
                runtime.studentList=JSON.parse(req.responseText);
                setCount(count+1);
            }
        }
    }
}

export default Student;