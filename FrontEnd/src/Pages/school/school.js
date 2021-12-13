import './school.css'
import {useEffect, useState} from "react";
import {deleteOne, runtime} from "../../Controller/runtime";
import {reRender} from "../../index";
import {Card} from "antd";
import Delete from "../../Components/Delete/Delete";

const School = (props)=>{
    const [count,setCount] = useState(0);
    useEffect(()=>{
        getSchoolList();
    })
    if(count === 0){
        getSchoolList();
    }
    let toShow = [];
    if(runtime.schoolList.length > 0){
        for (let i = 0; i < runtime.schoolList.length; i++) {
            let detail = [];
            for (const detailKey in runtime.schoolList[i]) {
                if(detailKey !== '_id'&& detailKey!=='Name'){
                    let temp = <p>{detailKey}:{runtime.schoolList[i][detailKey]}</p>
                    detail.push(temp)
                }
            }
            let tempDiv = <Card title={runtime.schoolList[i].Name} extra={
                <span>
                    <a onClick={()=>{gotoMajor(runtime.schoolList[i].ID)}}>查看</a>
                    <Delete confirm={()=>{deleteOne('school', runtime.schoolList[i].ID)
                        setCount(count+1);}}/>
                </span>


            } style={{ width: 300 }} className={"singleSchoolInfo"}>
                {detail}
            </Card>
            toShow.push(tempDiv);
        }
    }
    return <div id={"school"}>
        {toShow}
    </div>;

    function getSchoolList(){
        let req = new XMLHttpRequest();
        req.open('GET',runtime.host+'/getAllSchoolID');
        req.send();
        req.onreadystatechange = ()=>{
            if(req.readyState === 4 && req.status === 200){
                runtime.schoolList = JSON.parse(req.responseText);
                setCount(count+1);
            }
        }
    }

    function gotoMajor(schoolID){
        runtime.currentPage = 'major';
        console.log(runtime.currentPage);
        runtime.currentSchool = schoolID;
        props.setCurrentPage('major');
    }
}

export default School;