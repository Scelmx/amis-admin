import { SchemaNode, PlainObject } from "amis-core";
import { ClassValue } from "amis-core/lib/theme";
import { Button, Card, Tag } from "amis-ui";
import { Dropdown, MenuProps, Space } from "antd";
import React from "react";

export function ProduceDispatch() {
    const list = [{
        label: '生产线1',
        children: [{
            id: 0,
            label: '',
            customerId: ''
        }]
    }, {
        label: ''
    }]

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
            <Button icon="plus">添加机器 +</Button>
        </header>

        <div className="cards-container">
            <div className="card-row">
                {list.map((item) => (
                    <div className="card-col">
                        <Tag className="card-col_tag" processing>{item.label}</Tag>
                        {item.children?.map((child) => <Card title={
                            <div>
                                <span>订单信息</span>
                                <>
                                    {/** 更多操作 */}
                                    {/** 删除操作 */}
                                </>
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