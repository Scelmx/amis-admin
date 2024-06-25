import { Button, Card, Tag } from "amis-ui";
import React from "react";

export function ProduceDispatch() {
    const list = [{
        label: '生产线1',
        children: [{
            id: 0,
            label: ''
        }]
    }, {
        label: ''
    }]

    const updateOrder = (id: string | number) => {
        return 1
    }

    return (<div>
        <header className="plan-page_title">
            生产计划
        </header>

        <div className="cards-container">
            <div className="card-row">
                {list.map((item) => (
                    <div className="card-col">
                        <Tag className="card-col_tag" processing>{item.label}</Tag>
                        {item.children?.map((child) => <Card
                            title='订单信息'
                            extra={(
                                <Button onClick={() => updateOrder(child.id)}>
                                    完成
                                </Button>
                            )}>
                            <p>交付时间：{child.id}</p>
                            <p>交付时间：{child.id}</p>
                            <p>交付时间：{child.id}</p>
                        </Card>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>)
}