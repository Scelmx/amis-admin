import { Button } from "amis-ui";
import { Form, Input, Select, Modal } from "antd"
import { request } from "../../../utils/requestInterceptor";
import { FC, useRef, useState } from "react"

interface AddMachineProps {
    edit?: boolean;
}

export const AddMachine: FC<AddMachineProps> = ({ edit = undefined }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit();
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const items = [{
        key: 'name',
        label: '机器名称',
        type: 'input'
    }, {
        key: 'hole',
        label: '孔数',
        type: 'input'
    }, {
        key: 'mode',
        label: '额定模数',
        type: 'input'
    }, {
        key: 'type',
        label: '产线类型',
        type: 'select',
        options: [{
            label: 'A+B',
            value: 'A+B'
        }, {
            label: 'A+C',
            value: 'A+C'
        }]
    }]

    const getFormItem = () => {
        if (edit) {
            return [...items, {
                key: 'type',
                label: '产线类型',
                type: 'select',
                showSearch: true,
                multiply: true,
                options: []
            }]
        }
        return items
    }

    return <>
        <Button icon="plus" onClick={() => setVisible(true)}>添加机器 +</Button>
        {visible ? <Modal
            title={edit ? '编辑机器' : "添加机器"}
            cancelText="取消"
            okText='确定'
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form
                form={form}
                labelAlign="right"
                labelCol={{ flex: '110px' }}
                onFinish={async (value) => {
                    const res = await request({
                        url: edit ? '/api/machines/update' : '/api/machines/add',
                        method: 'POST',
                        data: {
                            ...value,
                            hole: value.hole * 1,
                            mode: value.mode * 1
                        }
                    })
                    if (res) {
                        setVisible(false);
                    }
                }}
            >
                {getFormItem().map((item: any) => {
                    const { type, key, label } = item
                    return <Form.Item name={key} label={label}>
                        {type === 'input' ? <Input /> : null}
                        {type === 'select' ? <Select options={item?.options ?? []} showSearch={item?.showSearch} /> : null}
                    </Form.Item>
                })}
            </Form>
        </Modal> : null}
    </>
} 