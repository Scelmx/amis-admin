import { Button, Card, Tag } from "amis-ui";
import { AddMachine } from "./AddMachine";
import { useEffect, useState } from "react";
import { request } from "@/utils/requestInterceptor";
import DropdownButton from "antd/es/dropdown/dropdown-button";

export function ProduceDispatch() {
    const [machinesList, setMachinesList] = useState<any[]>([])

    useEffect(() => {
        const init = async () => {
            const res: any = await request({ url: '/api/order/machines', method: 'get' })
            if (res) {
                setMachinesList([...res.data.data])
            }
        }
        init();
    }, [])

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        }
    ]

    const updateOrder = (id: string | number) => {
        return 1
    }

    return (<div className="plan-page">
        <header className="plan-page_title">
            <h3>生产计划</h3>
            <AddMachine></AddMachine>
        </header>

        <div className="cards-container">
            <div className="card-row">
                {(machinesList || [])?.map((item: any, index: number) => (
                    <div key={item.id} className="card-col">
                        <Tag className="card-col_tag" processing>{item.name || '机器' + index}</Tag>
                        {(item?.orders || [])?.map((child) => <Card
                            key={child.id}
                            title={
                                <div className="flex">
                                    <span>订单信息</span>
                                    <DropdownButton type="text" menu={{ items }}>{null}</DropdownButton>
                                </div>
                            }>
                            <div>客户名称：{child?.customerId}</div>
                            <div className="mb-16px mt-4px">交付时间：{child.id}</div>
                            <div className="card-col_tag-row">
                                <Tag>状态：{child.id}</Tag>
                                <Button onClick={updateOrder} size="xs" level="primary">完成</Button>
                            </div>
                        </Card>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>)
}