import './main.css'
import School from "./school/school";
import {useState} from "react";
import {runtime} from "../Controller/runtime";
import Major from "./major/major";
import Class from "./class/class";
import Student from "./student/student";
import {AddOne, Return} from "@icon-park/react";
import Insert from "../Components/Insert/Insert";

const Main = ()=>{
    const [currentPage,setCurrentPage] = useState(runtime.currentPage);
    const [addOn,setAddOn] = useState(false);
    let page = '';
    if(currentPage === 'school'){
        page = <School setCurrentPage={setCurrentPage}/>;
    }
    if(currentPage === 'major'){
        page = <Major setCurrentPage={setCurrentPage}/>
    }
    if(currentPage === 'class'){
        page = <Class setCurrentPage={setCurrentPage}/>
    }
    if(currentPage === 'student'){
        page = <Student setCurrentPage={setCurrentPage}/>
    }

    function back(){
        switch (currentPage){
            case "school":
                break;
            case "major":
                setCurrentPage('school');
                runtime.currentPage='school';
                break;
            case "class":
                setCurrentPage('major');
                runtime.currentPage='school';
                break;
            case "student":
                setCurrentPage('class');
                runtime.currentPage = 'class';
                break;
        }
    }

    function add(){
        setAddOn(true);
    }
    return <div id={"main"}>
        <div id={"topBar"} className={"topBar"}>
            <div className={"topButton"} onClick={back}>
                <Return theme="outline" size="30" fill="#333"/>
            </div>
            <div className={"topButton"} onClick={add}>
                <AddOne theme="outline" size="30" fill="#333"/>
            </div>
        </div>
        <div id={"pageContainer"} className={"pageContainer"}>
            {page}
            {addOn&&<Insert setOn={setAddOn}/>}
        </div>
    </div>;
}

export default Main;