import schema2component from "../../../utils/schema2component";

const schema = {
    "type": "page",
    "title": "test",
    "body": [
        {
            "type": "crud",
            "syncLocation": false,
            "api": {
                "method": "get",
                "url": "/api/customer/list?isList=true"
            },
            "columns": [
                {
                    "name": "id",
                    "label": "ID",
                    "type": "text",
                    "id": "u:ed5d1d5e8ce1"
                },
                {
                    "name": "ctName",
                    "label": "客户名称",
                    "type": "text",
                    "id": "u:454e721f51f1",
                },
                {
                    "type": "operation",
                    "label": "操作",
                    "buttons": [
                        {
                            "label": "编辑",
                            "type": "button",
                            "actionType": "dialog",
                            "level": "link",
                            "editorSetting": {
                                "behavior": "update"
                            },
                            "dialog": {
                                "type": "dialog",
                                "title": "编辑",
                                "body": [
                                    {
                                        "type": "form",
                                        "api": {
                                            "method": "post",
                                            "url": "/api/customer/update",
                                            "requestAdaptor": "",
                                            "adaptor": "",
                                            "messages": {}
                                        },
                                        "body": [
                                            {
                                                "name": "id",
                                                "label": "ID",
                                                "id": "u:c48d1c166257",
                                                "type": "input-text",
                                                "hidden": true
                                            },
                                            {
                                                "name": "customerName",
                                                "label": "客户名称",
                                                "id": "u:f3451f050a1f",
                                                "type": "input-text",
                                                "value": "${ctName}"
                                            }
                                        ],
                                        "id": "u:2255fa2f6c21",
                                        "actions": [
                                            {
                                                "type": "submit",
                                                "label": "提交",
                                                "primary": true
                                            }
                                        ],
                                        "feat": "Insert",
                                        "dsType": "api"
                                    }
                                ],
                                "id": "u:8f30a78749cc",
                                "actions": [
                                    {
                                        "type": "button",
                                        "actionType": "cancel",
                                        "label": "取消",
                                        "id": "u:8fb4d78fbad4"
                                    },
                                    {
                                        "type": "button",
                                        "actionType": "confirm",
                                        "label": "确定",
                                        "primary": true,
                                        "id": "u:62720441e2cc"
                                    }
                                ]
                            },
                            "id": "u:d2c1886c464a"
                        },
                        {
                            "type": "button",
                            "label": "删除",
                            "actionType": "ajax",
                            "level": "link",
                            "className": "text-danger",
                            "confirmText": "确定要删除？",
                            "api": {
                                "method": "get",
                                "url": "/api/customer/del?id=${id}"
                            },
                            "editorSetting": {
                                "behavior": "delete"
                            },
                            "id": "u:4fbaa086207f"
                        }
                    ],
                    "id": "u:052becb38dbd"
                }
            ],
            "bulkActions": [],
            "itemActions": [],
            "id": "u:da96c2e60550",
            "filter": {
                "id": "u:9f2c07ec640d",
                "actions": [
                    {
                        "type": "submit",
                        "label": "搜索",
                        "primary": true,
                        "id": "u:16e003460628"
                    }
                ],
                "feat": "Insert",
                "body": [
                    {
                        "type": "input-text",
                        "label": "客户名称",
                        "name": "ctName",
                        "id": "u:710c09f72cc6"
                    }
                ]
            },
            "perPageAvailable": [
                10
            ],
            "perPageField": "pageSize",
        }
    ],
    "id": "u:722e14902120",
    "asideResizor": false,
    "pullRefresh": {
        "disabled": true
    },
    "regions": [
        "body"
    ],
    "onEvent": {
        "init": {
            "weight": 0,
            "actions": []
        }
    }
}

export default schema2component(schema);