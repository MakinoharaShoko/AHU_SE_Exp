import './school.css'
import {useState} from "react";
import {runtime} from "../../Controller/runtime";

const School = ()=>{
    const [count,setCount] = useState(0);
    if(count === 0){
        getSchoolList();
    }
    let toShow = [];
    console.log("runtime at this time:")
    console.log(runtime.schoolList)
    if(runtime.schoolList.length > 0){
        for (let i = 0; i < runtime.schoolList.length; i++) {
            let tempDiv = <div className={"singleSchoolInfo"} key={i}>
                <div className={"schoolID"}>
                    ID: <span style={{color:'black'}}>{runtime.schoolList[i].ID}</span>
                </div>
                <div className={"SchoolName"}>
                    {runtime.schoolList[i].Name}
                </div>
            </div>
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
}

export default School;