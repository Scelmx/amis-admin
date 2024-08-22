import { Card, Tag } from "amis-ui";
import { AddMachine } from "./AddMachine";
import { useEffect, useState } from "react";
import { request } from "@/utils/requestInterceptor";
import DropdownButton from "antd/es/dropdown/dropdown-button";
import { Button, Modal } from "antd";

export function ProduceDispatch() {
    const [machinesList, setMachinesList] = useState<any[]>([])
    const [showTwin, setShowTwin] = useState<boolean>(false);
    const [active, setActive] = useState<any>();

    const getMachines = async () => {
        const res: any = await request({ url: '/api/order/machines', method: 'get' })
        if (res) {
            setMachinesList([...res.data.data])
        }
    }

    useEffect(() => {
        getMachines();
    }, [])

    const items = [
        // {
        //     key: '1',
        //     label: '移动至',
        //     children: machinesList.map((item, index) => {
        //         return {
        //             key: item.id,
        //             label: <div onClick={() => updateOrderInMachine(item.id)}>{item.name || '机器' + index}</div>,
        //         }
        //     })
        // }, 
        {
            key: '2',
            label: <AddMachine
                buttonText="编辑"
                initialValues={active}
                edit={true}
                confirmCallback={getMachines}>    
            </AddMachine>
        }, {
            key: '3',
            label: <div
                className="dropdown-del-btn"
                onClick={() => {
                    setShowTwin(true)
                }}
            >
                删除
            </div>,
        }
    ]

    const updateOrderInMachine = async (machineId: number) => {
        const res = await request({ url: `/api/machine/update?id=${active.id}&machineId=${machineId}`, method: 'get' })
        if (res.data) {
            getMachines();
        }
    }

    return (<div className="plan-page">
        <header className="plan-page_title">
            <h3>生产计划</h3>
            <AddMachine confirmCallback={getMachines}></AddMachine>
        </header>

        <div className="cards-container">
            <div className="card-row">
                {(machinesList || [])?.map((item: any, index: number) => (
                    <div key={item.id} className="card-col">
                        {/** 机器标题区 */}
                        <div className="card-col_header flex mb-16px">
                            <Tag className="card-col_tag" processing>{item.name || '机器' + index}</Tag>
                            <DropdownButton
                                trigger={["click"]}
                                align={{
                                    points: ['t', 'l'],
                                    offset: [20, 16]
                                }}
                                type="text"
                                menu={{ items }}
                                onOpenChange={(value) => {
                                    if (value) {
                                        setActive({ ...item })
                                    }
                                }}>
                            </DropdownButton>
                        </div>

                        {/** 机器列内容区 */}
                        <div className="card-col_content">
                            {(item?.orders || [])?.map((child) => <Card
                                key={child.id}
                                title={
                                    <div className="flex">
                                        <span>订单信息</span>
                                    </div>
                                }>
                                <div>客户名称：{child?.customerId}</div>
                                <div className="mb-16px mt-4px">交付时间：{child.id}</div>
                                <div className="card-col_tag-row">
                                    <Tag>状态：{child.id}</Tag>
                                    <Button onClick={(value: any) => updateOrder(value)} type="primary" size="small">完成</Button>
                                </div>
                            </Card>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/** 二次确认弹窗 */}
        <Modal
            title="删除机器"
            cancelText="取消"
            okText='确定'
            open={showTwin}
            width={524}
            okButtonProps={{
                danger: true
            }}
            onCancel={() => {
                setShowTwin(false)
            }}
            onOk={async () => {
                const res = await request({ url: '/api/machines/del?id=' + active.id, method: 'get' })
                if (res.data) {
                    setShowTwin(false)
                }
            }}>
            你确定要删除该机器吗？
        </Modal>
    </div>)
}