import {runtime, setPostBody} from "./runtime";

const login = (account,password,setLoginStatus)=>{
    let loginReq = new XMLHttpRequest();
    loginReq.open('POST',runtime.host+`/login`);
    let body = setPostBody({account:account,password:password});
    loginReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    loginReq.send(body);
    loginReq.onreadystatechange = ()=>{
        if(loginReq.readyState === 4 && loginReq.status === 200){
            let result = loginReq.responseText;
            if(result !=='ERROR'){
                runtime.loginStatus = result;
                setLoginStatus(result);
            }else
                alert("密码错误，请重试");
        }
    }
}

export default login;