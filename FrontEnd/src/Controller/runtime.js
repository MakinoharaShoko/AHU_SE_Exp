let runtime ={
    currentPage:'school',
    currentSchool:'',
    currentMajor:'',
    currentClass:'',
    host:'',
    schoolList:[],
    majorList:[],
    classList:[],
    studentList:[]
}

runtime.host=`/api`

function setPostBody(body){
    let flag = true;
    let str = '';
    for (const bodyKey in body) {
        if(flag){
            str = str+`${bodyKey}=${body[bodyKey]}`;
            flag = false
        }else {
            str = str+`&${bodyKey}=${body[bodyKey]}`
        }
    }
    return str;
}

function deleteOne(table,ID){
    let deleteReq = new XMLHttpRequest();
    deleteReq.open('POST',runtime.host+`/delete`);
    let body = setPostBody({table:table,ID:ID});
    deleteReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    deleteReq.send(body);
}

export {runtime,setPostBody,deleteOne};