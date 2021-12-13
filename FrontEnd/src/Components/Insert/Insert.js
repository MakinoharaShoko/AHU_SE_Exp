import './insert.css';
import {runtime} from "../../Controller/runtime";
import AddOther from "../AddOther/AddOther";
import {CloseOne} from "@icon-park/react";
import AddStudent from "../AddStudent/AddStudent";

const Insert = (props) => {
    let close = ()=>{props.setOn(false)}
    let page = [];
    if(runtime.currentPage !== 'student'){
        let temp = <AddOther closeFun={close}/>
        page.push(temp);
    }else {
        let temp = <AddStudent closeFun={close}/>;
        page.push(temp)
    }
    return <div id={"insert"}>
        <div className={"box"}>
            <div onClick={()=>{
                props.setOn(false)
            }
            }>
                <CloseOne theme="outline" size="24" fill="#333"/>
            </div>
            {page}
        </div>
    </div>
}

export default Insert;