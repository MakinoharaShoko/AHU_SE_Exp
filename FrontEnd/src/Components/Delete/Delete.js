import { Popconfirm, message } from 'antd';

const Delete = (props)=>{
    function confirm(e) {
        console.log(e);
        message.success('删除成功');
        props.confirm();
    }

    function cancel(e) {
        console.log(e);
        message.error('取消删除');
    }

    return <Popconfirm
        title="确认要删除？"
        onConfirm={confirm}
        onCancel={cancel}
        okText="是"
        cancelText="否"
    >
        <a href="#" style={{margin:'0 0 0 10px'}}>删除</a>
    </Popconfirm>
}

export default Delete;


