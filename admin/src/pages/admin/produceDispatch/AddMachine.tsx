import { Button } from "amis-ui";
import { Form, Input, Select, Modal } from "antd"
import { request } from "../../../utils/requestInterceptor";
import { FC, useEffect, useRef, useState } from "react"

interface AddMachineProps {
    edit?: boolean;
    buttonText?: string,
    initialValues?: any
    confirmCallback?: () => void
}

export const AddMachine: FC<AddMachineProps> = ({ edit = undefined, buttonText = '添加机器 +', initialValues = undefined, confirmCallback }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [moldOptions, setMoldOptions] = useState(false);

    const getMoldList = async () => {
        const { data: res }: any = await request({
            url: '/api/molds/list',
            method: 'get',
            params: {
                type: 'options'
            }
        })
        if (res.data) {
            setMoldOptions(res.data)
        }
    }

    useEffect(() => {
        const init = async () => {
            await getMoldList()
        }
        init();
    }, [])

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
        key: 'mold',
        label: '关联模具',
        type: 'select',
        options: moldOptions,
    }, {
        key: 'type',
        label: '产线类型',
        type: 'select',
        options: [{
            label: 'A',
            value: 'A'
        }, {
            label: 'B',
            value: 'C'
        }, {
            label: 'C',
            value: 'C'
        }, {
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
        <div
            style={!edit ? {
                border: '1px solid #e8e9eb',
                padding: '4px 8px',
                fontSize: '14px',
                lineHeight: '22px',
                borderRadius: '4px',
                cursor: 'pointer',
            } : undefined}
            onClick={() => setVisible(true)}>
            {buttonText}
        </div>
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
                initialValues={initialValues}
                onFinish={async (value) => {
                    const res = await request({
                        url: edit ? '/api/machines/update' : '/api/machines/add',
                        method: 'POST',
                        data: {
                            ...value,
                            id: edit ? initialValues.id : undefined,
                            mold: value.mold * 1
                        }
                    })
                    if (res) {
                        setVisible(false);
                        confirmCallback?.();
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