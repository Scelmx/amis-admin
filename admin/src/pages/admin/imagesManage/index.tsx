import schema2component from "../../../utils/schema2component";

const schema = {
    "type": "page",
    "body": [
        {
            "type": "crud",
            "syncLocation": false,
            "api": {
                "method": "get",
                "url": "/api/prodinfo/list"
            },
            "columns": [
                {
                    "name": "id",
                    "label": "ID",
                    "type": "text",
                    "id": "u:32e3d1a8f2a6"
                },
                {
                    "type": "mapping",
                    "label": "类型",
                    "name": "ptype",
                    "id": "u:53ffdabf3dda",
                    "placeholder": "-",
                    "map": {
                        "pw": "皮碗",
                        "oxq": "O型圈",
                        "yxq": "Y型圈"
                    }
                },
                {
                    "type": "text",
                    "id": "u:fec6f1542c2c",
                    "placeholder": "-",
                    "label": "圆心X1",
                    "name": "centerX1"
                },
                {
                    "type": "text",
                    "id": "u:1a7ba69df531",
                    "placeholder": "-",
                    "label": "圆心Y1",
                    "name": "centerY1"
                },
                {
                    "type": "text",
                    "id": "u:0a4858456b3c",
                    "placeholder": "-",
                    "label": "真圆心1",
                    "name": "realCenter1"
                },
                {
                    "name": "centerX2",
                    "label": "圆心X2",
                    "type": "text",
                    "id": "u:c2b4575b2e58",
                    "placeholder": "-"
                },
                {
                    "name": "centerY2",
                    "label": "圆心Y2",
                    "type": "text",
                    "id": "u:328b182a8ed3",
                    "placeholder": "-"
                },
                {
                    "type": "text",
                    "label": "真圆心2",
                    "id": "u:e07902fd817a",
                    "placeholder": "-",
                    "name": "realCenter2"
                },
                {
                    "type": "image",
                    "id": "u:d6d874ea5884",
                    "name": "imageLeft",
                    "label": "左图片",
                    "placeholder": "-"
                },
                {
                    "name": "imageRight",
                    "label": "右图片",
                    "type": "image",
                    "id": "u:8506f6e311de",
                    "placeholder": "-"
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
                                        "api": "post:/api/prodinfo/update",
                                        "body": [
                                            {
                                                "name": "id",
                                                "label": "ID",
                                                "id": "u:171f96f345df",
                                                "type": "input-text",
                                                "hidden": true
                                            },
                                            {
                                                "label": "类型",
                                                "name": "ptype",
                                                "id": "u:b2ea52bd471d",
                                                "placeholder": "-",
                                                "type": "select",
                                                "options": [
                                                    {
                                                        "label": "皮碗",
                                                        "value": "pw"
                                                    },
                                                    {
                                                        "label": "O型圈",
                                                        "value": "oxq"
                                                    },
                                                    {
                                                        "label": "Y型圈",
                                                        "value": "yxq"
                                                    }
                                                ],
                                                "multiple": false,
                                                "required": true,
                                                "validateOnChange": true
                                            },
                                            {
                                                "id": "u:7591a0729dab",
                                                "placeholder": "-",
                                                "label": "圆心X1",
                                                "name": "centerX1",
                                                "type": "input-text",
                                                "required": true,
                                                "validations": {
                                                    "isNumeric": true
                                                },
                                                "validateOnChange": true
                                            },
                                            {
                                                "id": "u:dde58141ebe2",
                                                "placeholder": "-",
                                                "label": "圆心Y1",
                                                "name": "centerY1",
                                                "type": "input-text",
                                                "required": true,
                                                "validations": {
                                                    "isNumeric": true
                                                },
                                                "validateOnChange": true
                                            },
                                            {
                                                "id": "u:05a058285e3a",
                                                "placeholder": "-",
                                                "label": "真圆心1",
                                                "name": "realCenter1",
                                                "type": "input-text",
                                                "validateOnChange": true,
                                                "required": true,
                                                "validations": {
                                                    "isNumeric": true
                                                }
                                            },
                                            {
                                                "name": "centerX2",
                                                "label": "圆心X2",
                                                "id": "u:3ece7719c6ef",
                                                "placeholder": "-",
                                                "type": "input-text",
                                                "required": true,
                                                "validations": {
                                                    "isNumeric": true
                                                },
                                                "validateOnChange": true,
                                                "hiddenOn": "${ptype==='oxq' || !ptype}"
                                            },
                                            {
                                                "name": "centerY2",
                                                "label": "圆心Y2",
                                                "id": "u:721f511173b9",
                                                "placeholder": "-",
                                                "type": "input-text",
                                                "validations": {
                                                    "isNumeric": true
                                                },
                                                "validateOnChange": true,
                                                "required": true,
                                                "hiddenOn": "${ptype==='oxq' || !ptype}"
                                            },
                                            {
                                                "label": "真圆心2",
                                                "id": "u:9e981b90442c",
                                                "placeholder": "-",
                                                "name": "realCenter2",
                                                "type": "input-text",
                                                "validations": {
                                                    "isNumeric": true
                                                },
                                                "validateOnChange": true,
                                                "required": true,
                                                "hiddenOn": "${ptype==='oxq' || !ptype}"
                                            },
                                            {
                                                "id": "u:798eea17ca31",
                                                "name": "imageLeft",
                                                "label": "左图片",
                                                "placeholder": "-",
                                                "type": "input-image",
                                                "accept": ".jpeg, .jpg, .png, .gif",
                                                "uploadType": "fileReceptor",
                                                "proxy": true,
                                                "multiple": false,
                                                "hideUploadButton": false,
                                                // "autoUpload": false,
                                                "receiver": {
                                                    "url": "/api/prodinfo/upload",
                                                    "method": "post"
                                                },
                                                "required": true
                                            },
                                            {
                                                "name": "imageRight",
                                                "label": "右图片",
                                                "id": "u:620a7fc3c692",
                                                "placeholder": "-",
                                                "type": "input-image",
                                                "accept": ".jpeg, .jpg, .png, .gif",
                                                "uploadType": "fileReceptor",
                                                "proxy": true,
                                                "multiple": false,
                                                "hideUploadButton": false,
                                                // "autoUpload": false,
                                                "receiver": {
                                                    "url": "/api/prodinfo/upload",
                                                    "method": "post"
                                                },
                                                "required": true
                                            }
                                        ],
                                        "id": "u:f3efe6b4c254",
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
                                "id": "u:ea093ca4b01b",
                                "actions": [
                                    {
                                        "type": "button",
                                        "actionType": "cancel",
                                        "label": "取消",
                                        "id": "u:9ad07b725739"
                                    },
                                    {
                                        "type": "button",
                                        "actionType": "confirm",
                                        "label": "确定",
                                        "primary": true,
                                        "id": "u:d16d982617fe"
                                    }
                                ]
                            },
                            "id": "u:a5d2b147e442"
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
                                "url": "/api/prodinfo/del?id=${id}"
                            },
                            "editorSetting": {
                                "behavior": "delete"
                            },
                            "id": "u:e41a117ab8ea"
                        }
                    ],
                    "id": "u:efb71c206c06"
                }
            ],
            "bulkActions": [],
            "itemActions": [],
            "id": "u:4b60892072a2",
            "filter": {
                "id": "u:c484dda23602",
                "actions": [
                    {
                        "type": "submit",
                        "label": "搜索",
                        "primary": true,
                        "id": "u:313e8d141b76"
                    }
                ],
                "feat": "Insert",
                "body": [
                    {
                        "type": "select",
                        "label": "类型",
                        "name": "ptype",
                        "id": "u:f89c5cdf41de",
                        "size": "sm",
                        "source": "/api/product/typeList"
                    },
                    {
                        "type": "submit",
                        "label": "搜索",
                        "onEvent": {
                            "click": {
                                "actions": []
                            }
                        },
                        "id": "u:bb5bb91fd2df",
                        "level": "primary"
                    }
                ],
                "wrapWithPanel": false
            },
            "showHeader": true,
            "header": {
                "type": "flex",
                "id": "u:92f8142e3b30",
                "className": "p-1",
                "items": [
                    {
                        "type": "container",
                        "body": [
                            {
                                "type": "button",
                                "label": "上传图片",
                                "id": "u:89a4d211a18f",
                                "actionType": "dialog",
                                "dialog": {
                                    "type": "dialog",
                                    "id": "u:50e116786741",
                                    "actions": [
                                        {
                                            "type": "button",
                                            "label": "取消",
                                            "actionType": "cancel",
                                            "id": "u:82a3dd32d900"
                                        },
                                        {
                                            "type": "button",
                                            "actionType": "confirm",
                                            "label": "确定",
                                            "primary": true,
                                            "id": "u:54cf2ffaf746"
                                        }
                                    ],
                                    "body": [
                                        {
                                            "type": "form",
                                            "api": "post:/api/prodinfo/add",
                                            "body": [
                                                {
                                                    "label": "类型",
                                                    "name": "ptype",
                                                    "type": "select",
                                                    "id": "u:b2ea52bd471d",
                                                    "placeholder": "-",
                                                    "options": [
                                                        {
                                                            "label": "皮碗",
                                                            "value": "pw"
                                                        },
                                                        {
                                                            "label": "O型圈",
                                                            "value": "oxq"
                                                        },
                                                        {
                                                            "label": "Y型圈",
                                                            "value": "yxq"
                                                        }
                                                    ],
                                                    "multiple": false,
                                                    "required": true,
                                                    "validateOnChange": true
                                                },
                                                {
                                                    "label": "圆心X1",
                                                    "name": "centerX1",
                                                    "type": "input-text",
                                                    "id": "u:7591a0729dab",
                                                    "placeholder": "-",
                                                    "required": true,
                                                    "validations": {
                                                        "isNumeric": true
                                                    },
                                                    "validateOnChange": true
                                                },
                                                {
                                                    "name": "centerY1",
                                                    "label": "圆心Y1",
                                                    "id": "u:dde58141ebe2",
                                                    "placeholder": "-",
                                                    "type": "input-text",
                                                    "required": true,
                                                    "validations": {
                                                        "isNumeric": true
                                                    },
                                                    "validateOnChange": true
                                                },
                                                {
                                                    "id": "u:05a058285e3a",
                                                    "placeholder": "-",
                                                    "label": "真圆心1",
                                                    "name": "realCenter1",
                                                    "type": "input-text",
                                                    "validateOnChange": true,
                                                    "required": true,
                                                    "validations": {
                                                        "isNumeric": true
                                                    }
                                                },
                                                {
                                                    "name": "centerX2",
                                                    "label": "圆心X2",
                                                    "id": "u:3ece7719c6ef",
                                                    "placeholder": "-",
                                                    "type": "input-text",
                                                    "required": true,
                                                    "validations": {
                                                        "isNumeric": true
                                                    },
                                                    "validateOnChange": true,
                                                    "hiddenOn": "${ptype==='oxq' || !ptype}"
                                                },
                                                {
                                                    "name": "centerY2",
                                                    "label": "圆心Y2",
                                                    "id": "u:721f511173b9",
                                                    "placeholder": "-",
                                                    "type": "input-text",
                                                    "validations": {
                                                        "isNumeric": true
                                                    },
                                                    "validateOnChange": true,
                                                    "required": true,
                                                    "hiddenOn": "${ptype==='oxq' || !ptype}"
                                                },
                                                {
                                                    "label": "真圆心2",
                                                    "id": "u:9e981b90442c",
                                                    "placeholder": "-",
                                                    "name": "realCenter2",
                                                    "type": "input-text",
                                                    "validations": {
                                                        "isNumeric": true
                                                    },
                                                    "validateOnChange": true,
                                                    "required": true,
                                                    "hiddenOn": "${ptype==='oxq' || !ptype}"
                                                },
                                                {
                                                    "id": "u:798eea17ca31",
                                                    "name": "imageLeft",
                                                    "label": "左图片",
                                                    "placeholder": "-",
                                                    "type": "input-image",
                                                    "accept": ".jpeg, .jpg, .png, .gif",
                                                    "uploadType": "fileReceptor",
                                                    "proxy": true,
                                                    "multiple": false,
                                                    "hideUploadButton": false,
                                                    // "autoUpload": false,
                                                    "receiver": {
                                                        "url": "/api/prodinfo/upload",
                                                        "method": "post"
                                                    },
                                                    "required": true
                                                },
                                                {
                                                    "name": "imageRight",
                                                    "label": "右图片",
                                                    "id": "u:620a7fc3c692",
                                                    "placeholder": "-",
                                                    "type": "input-image",
                                                    "accept": ".jpeg, .jpg, .png, .gif",
                                                    "uploadType": "fileReceptor",
                                                    "proxy": true,
                                                    "multiple": false,
                                                    "hideUploadButton": false,
                                                    // "autoUpload": false,
                                                    "receiver": {
                                                        "url": "/api/prodinfo/upload",
                                                        "method": "post"
                                                    },
                                                    "required": true
                                                }
                                            ],
                                            "id": "u:f3efe6b4c254",
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
                                    "showCloseButton": true,
                                    "closeOnOutside": false,
                                    "closeOnEsc": false,
                                    "showErrorMsg": true,
                                    "showLoading": true,
                                    "draggable": false,
                                    "title": "上传图片"
                                }
                            }
                        ],
                        "size": "xs",
                        "style": {
                            "position": "static",
                            "display": "flex",
                            "flex": "1 1 auto",
                            "flexGrow": 1,
                            "flexWrap": "nowrap",
                            "flexDirection": "row-reverse",
                            "alignItems": "center"
                        },
                        "wrapperBody": false,
                        "isFixedHeight": false,
                        "isFixedWidth": false,
                        "id": "u:704a80fa1ef5"
                    }
                ],
                "style": {
                    "position": "relative"
                }
            },
            "perPageAvailable": [
                10
            ],
            "messages": {},
            "perPageField": "pageSize",
            "source": "${row}"
        }
    ],
    "id": "u:e5df6d7a1400",
    "asideResizor": false,
    "pullRefresh": {
        "disabled": true
    },
    "regions": [
        "body"
    ]
}

export default schema2component(schema);