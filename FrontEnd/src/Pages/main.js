import './main.css'
import School from "./school/school";
import {useState} from "react";
import {runtime} from "../Controller/runtime";
import Major from "./major/major";
import Class from "./class/class";
import Student from "./student/student";

const Main = ()=>{
    const [currentPage,setCurrentPage] = useState(runtime.currentPage);
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
    return <div id={"main"}>
        <div id={"topBar"} className={"topBar"}>

        </div>
        <div id={"pageContainer"} className={"pageContainer"}>
            {page}
        </div>
    </div>;
}

export default Main;