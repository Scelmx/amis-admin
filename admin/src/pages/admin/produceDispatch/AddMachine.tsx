import { Modal } from "amis-ui"
import { Form, Input } from "antd"
import React from "react"

/** TODO: 添加弹窗 */
export const AddMachine = () => {
    return <Modal>
        <Form>
            <Form.Item name="hole" label="Hole">
                <Input />
            </Form.Item>
        </Form>
    </Modal>
} 