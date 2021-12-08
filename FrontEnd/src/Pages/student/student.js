import './student.css'
import {Descriptions, Button, Card} from 'antd';
import {runtime, setPostBody} from "../../Controller/runtime";
import {useState} from "react";

const Student = (props)=>{
    const [count,setCount] = useState(0)

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
                extra={<Button type="primary">Edit</Button>}
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
        let req = new XMLHttpRequest();
        req.open('POST',runtime.host+'/getinfo/');
        let sendBody = {table:'class',ID:runtime.currentClass};
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