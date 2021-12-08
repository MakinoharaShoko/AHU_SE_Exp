import './main.css'
import School from "./school/school";
import {useState} from "react";
import {runtime} from "../Controller/runtime";

const Main = ()=>{
    const [currentPage,setCurrentPage] = useState(runtime.currentPage);
    let page = '';
    if(currentPage === 'school'){
        page = <School/>;
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