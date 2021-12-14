import './class.css'
import {useEffect, useState} from "react";
import {deleteOne, runtime, setPostBody} from "../../Controller/runtime";
import {Card} from "antd";
import Delete from "../../Components/Delete/Delete";

const Class = (props)=>{
    const [count,setCount] = useState(0);
    useEffect(()=>{
        getClassList();
    })
    if(count === 0){
        getClassList();
    }
    let page = [];
    for (const classListKey in runtime.classList) {
        if(classListKey.substring(0,5)==='class'){
            let detail = [];
            for (const detailKey in runtime.majorList[classListKey]) {
                if(detailKey !== '_id'&& detailKey!=='Name'){
                    let temp = <p>{detailKey}:{runtime.majorList[classListKey][detailKey]}</p>
                    detail.push(temp)
                }
            }
            let temp = <Card title={runtime.classList[classListKey].Name} extra={
                <span>
                <a onClick={()=>{gotoStudentList(runtime.classList[classListKey].ID)}}>查看</a>
                <Delete confirm={()=>{deleteOne('major', runtime.classList[classListKey].ID)
                setCount(count+1);}}/>
                </span>
            } style={{ width: 300 }} className={"singleSchoolInfo"}>
                {detail}
            </Card>
            page.push(temp);
        }
    }
    return <div id={'class'}>
        {page}
    </div>

    function getClassList(){
        let req = new XMLHttpRequest();
        req.open('POST',runtime.host+'/getinfo/');
        let sendBody = {table:'major',ID:runtime.currentMajor};
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        req.send(setPostBody(sendBody));
        req.onreadystatechange = ()=>{
            if(req.readyState === 4 && req.status === 200){
                runtime.classList=JSON.parse(req.responseText);
                setCount(count+1);
            }
        }
    }

    function gotoStudentList(classID){
        runtime.currentPage = 'student';
        runtime.currentClass = classID;
        props.setCurrentPage('student');
    }
}

export default Class;