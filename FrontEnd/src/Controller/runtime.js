let runtime ={
    currentPage:'school',
    host:'',
    schoolList:[]
}

runtime.host = runtime.host=`http://${document.domain}:3001`

function setPostBody(body){
    let flag = true;
    let str = '';
    for (const bodyKey in body) {
        if(flag){
            str = str+`${bodyKey}:${body[bodyKey]}`;
            flag = false
        }else {
            str = str+`&${bodyKey}:${body[bodyKey]}`
        }
    }
    return str;
}
export {runtime,setPostBody};