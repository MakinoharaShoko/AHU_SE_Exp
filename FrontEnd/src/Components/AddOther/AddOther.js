import { Form, Input, Button, Checkbox } from 'antd';
import {runtime} from "../../Controller/runtime";

const AddOther = (props) => {
    const onFinish = (values) => {
        let body = '';
        body =`Name=${values.Name}&ID=${values.ID}&Description=${values.description}`;
        if(runtime.currentPage === "major"){
            body = body+`&school_ID=${runtime.currentSchool}`
        }else if(runtime.currentPage ==='class'){
            body = body+`&major_ID=${runtime.currentMajor}`
        }

        console.log('Success:', values);
        let sendValue = new XMLHttpRequest();
        let url = runtime.host+`/upsert/${runtime.currentPage}`

        sendValue.open('POST',url);
        sendValue.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        sendValue.send(body);
        props.closeFun();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
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
                label="名称"
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
                name="description"
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
    );
};

export default AddOther;