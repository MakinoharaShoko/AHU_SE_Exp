import './index.css'
import School from "./school/school";
import {useState} from "react";
import {runtime} from "../Controller/runtime";
import Major from "./major/major";
import Class from "./class/class";
import Student from "./student/student";
import {AddOne, Return} from "@icon-park/react";
import Insert from "../Components/Insert/Insert";
import {Button, Input} from "antd";
import login from "../Controller/service";
import Image from '../assets/background.png'

const Index = ()=>{
    const [loginStatus,setLoginStatus] = useState('none');
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
                runtime.currentLabel.pop();
                setCurrentPage('school');
                runtime.currentPage='school';
                break;
            case "class":
                runtime.currentLabel.pop();
                setCurrentPage('major');
                runtime.currentPage='school';
                break;
            case "student":
                runtime.currentLabel.pop();
                setCurrentPage('class');
                runtime.currentPage = 'class';
                break;
        }
    }

    function add(){
        setAddOn(true);
    }

    let showLabel = '';
    for (const string of runtime.currentLabel) {
        showLabel =  showLabel + `${string}/`
    }

    let pageIndex = {}

    let pageAfterLogin = <div id={"main"}>
        <div id={"topBar"} className={"topBar"}>
            <div className={"topButton"} onClick={back}>
                <Return theme="outline" size="30" fill="#333"/>
            </div>
            <div className={"topButton"} onClick={add}>
                <AddOne theme="outline" size="30" fill="#333"/>
            </div>
            <div className={'topLabel'}>
                {showLabel}
            </div>
        </div>
        <div id={"pageContainer"} className={"pageContainer"}>
            {page}
            {addOn&&<Insert setOn={setAddOn}/>}
        </div>
    </div>

    let pageBeforeLogin = <div className={"loginPage"} style={{ backgroundImage: `url(${Image})`}}>
        <div className={'inputBoxLogin'}>
            <div className={"loginTitle"}>管理员登录</div>
            <br/>
            <Input id={'accInput'} className={"inputBlock"} placeholder="输入账号" />
            <Input.Password id={"pwdInput"} className={"inputBlock"} placeholder="输入密码" />
            <Button type="primary" onClick={()=>{
                let account = document.getElementById('accInput').value;
                let password = document.getElementById('pwdInput').value;
                login(account,password,setLoginStatus);
            }}>登录</Button>
        </div>

    </div>

    if(loginStatus !=='none'){
        pageIndex = pageAfterLogin;
    }else{
        pageIndex = pageBeforeLogin;
    }


    return pageIndex;
}

export default Index;