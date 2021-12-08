import './major.css'
import {useState} from "react";
import {runtime} from "../../Controller/runtime";
import {setPostBody} from "../../Controller/runtime";
import {Card} from "antd";

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
            let temp = <Card title={runtime.majorList[majorListKey].Name} extra={<a onClick={()=>{
                gotoClassList(runtime.majorList[majorListKey].ID);
            }}>More</a>} style={{ width: 300 }} className={"singleSchoolInfo"}>
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

    function gotoClassList(majorID){
        runtime.currentPage = 'class';
        runtime.currentMajor = majorID;
        props.setCurrentPage('class');
    }
}

export default Major;