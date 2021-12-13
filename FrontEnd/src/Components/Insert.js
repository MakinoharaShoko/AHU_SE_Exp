import './insert.css';
import {runtime} from "../Controller/runtime";
import AddOther from "./add_other/AddOther";
import {CloseOne} from "@icon-park/react";

const Insert = (props) => {
    let page = [];
    if(runtime.currentPage !== 'student'){
        let temp = <AddOther/>
        page.push(temp);
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