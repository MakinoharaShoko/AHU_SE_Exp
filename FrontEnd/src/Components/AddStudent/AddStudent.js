import { Form, Input, Button, Checkbox } from 'antd';
import {runtime, setPostBody} from "../../Controller/runtime";

const AddStudent = (props)=>{
    const onFinish = (values) => {
        values['class_ID'] = runtime.currentClass;
        let body = setPostBody(values);
        console.log('Success:', values);
        let sendValue = new XMLHttpRequest();
        let url = runtime.host+`/upsert/Stu`
        sendValue.open('POST',url);
        sendValue.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        sendValue.send(body);
        props.closeFun();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="姓名"
            name="Name"
            rules={[
                {
                    required: true,
                    message: 'Please input name!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="ID"
            name="ID"
            rules={[
                {
                    required: true,
                    message: 'Please input ID!',
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="描述"
            name="Description"
            rules={[
                {
                    required: true,
                    message: 'Please input name!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="性别"
            name="Sex"
            rules={[
                {
                    required: true,
                    message: 'Please input Sex!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}

export default AddStudent;