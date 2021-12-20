import './major.css'
import {useEffect, useState} from "react";
import {deleteOne, runtime} from "../../Controller/runtime";
import {setPostBody} from "../../Controller/runtime";
import {Card} from "antd";
import Delete from "../../Components/Delete/Delete";

const Major = (props)=>{
    const [count,setCount] = useState(0);
    if(count === 0){
        getMajorList();
    }
    let page = [];
    for (const majorListKey in runtime.majorList) {
        if(majorListKey.substring(0,5)==='major'){
            let detail = [];
            for (const detailKey in runtime.majorList[majorListKey]) {
                if(detailKey !== '_id'&& detailKey!=='Name'){
                    let temp = <p>{detailKey}:{runtime.majorList[majorListKey][detailKey]}</p>
                    detail.push(temp)
                }
            }
            let temp = <Card title={runtime.majorList[majorListKey].Name} extra={
                <span>
                    <a onClick={()=>{gotoClassList(runtime.majorList[majorListKey].ID,runtime.majorList[majorListKey].Name);}}>查看</a>
                    <Delete confirm={()=>{deleteOne('major', runtime.majorList[majorListKey].ID)
                        getMajorList();}}/>
                </span>

            } style={{ width: 300 }} className={"singleSchoolInfo"}>
                {detail}
            </Card>
            page.push(temp);
        }
    }
    return <div id={'major'}>
        {page}
    </div>

    function getMajorList(){
        let req = new XMLHttpRequest();
        req.open('POST',runtime.host+'/getinfo/');
        let sendBody = {table:'school',ID:runtime.currentSchool};
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        req.send(setPostBody(sendBody));
        req.onreadystatechange = ()=>{
            if(req.readyState === 4 && req.status === 200){
                runtime.majorList=JSON.parse(req.responseText);
                setCount(count+1);
            }
        }
    }

    function gotoClassList(majorID,majorName){
        runtime.currentLabel.push(majorName);
        runtime.currentPage = 'class';
        runtime.currentMajor = majorID;
        props.setCurrentPage('class');
    }
}

export default Major;