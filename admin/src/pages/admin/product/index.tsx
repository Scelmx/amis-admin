import schema2component from "../../../utils/schema2component";

const schema = {
  "type": "page",
  "title": "客户列表",
  "body": [
    {
      "type": "crud",
      "id": "u:a3cc2c9fd671",
      "api": {
        "method": "get",
        "url": "/api/product/list",
        "messages": {},
        "requestAdaptor": "",
        "adaptor": "",
        "dataType": "json",
        "data": {
          "&": "$$"
        }
      },
      "footerToolbar": [
        {
          "type": "switch-per-page"
        },
        {
          "type": "statistics"
        },
        {
          "type": "pagination"
        }
      ],
      "columns": [
        {
          "label": "客户名称",
          "name": "customerId",
          "id": "u:5e22fba6d140",
          "placeholder": "-",
          "type": "map",
          "source": {
            "url": "/api/customer/list",
            "method": "get",
            "requestAdaptor": "",
            "adaptor": "",
            "messages": {}
          }
        },
        {
          "label": "供给物料",
          "name": "ptype",
          "id": "u:73fe3aaf7672",
          "placeholder": "-",
          "type": "mapping",
          "source": "/api/product/typeList"
        },
        {
          "label": "订单编号",
          "name": "orderNo",
          "type": "text",
          "id": "u:0fe9cfa3758a"
        },
        {
          "label": "物料编码",
          "name": "productNo",
          "id": "u:67c7f27aaae6",
          "placeholder": "-",
          "type": "text"
        },
        {
          "type": "image",
          "id": "u:d6d874ea5884",
          "name": "productImage",
          "label": "图片",
          "placeholder": "-"
      },
        {
          "label": "材质",
          "name": "material",
          "id": "u:b4f1d697fe24",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "型号",
          "name": "size",
          "id": "u:d38713f4f126",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "颜色",
          "name": "color",
          "id": "u:2d9c12de814a",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "材料硬度",
          "name": "materialHardness",
          "id": "u:4f43fe65c6e1",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "拉伸强度",
          "name": "tensileStrength",
          "id": "u:951e39c61e11",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "拉伸延长率",
          "name": "stretchElongationRate",
          "id": "u:7121310649d3",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "撕裂强度",
          "name": "tearStrength",
          "id": "u:a396b9c5e308",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "检测硬度",
          "name": "testHardness",
          "id": "u:4837b6cf4b53",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "检测强度",
          "name": "testStrength",
          "id": "u:4e4ff03b3861",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "检测延长率",
          "name": "testElongationRate",
          "id": "u:8f0bf184b286",
          "placeholder": "-",
          "type": "text"
        },
        {
          "type": "text",
          "label": "检测撕裂",
          "id": "u:7e881874bbf9",
          "placeholder": "-",
          "name": "testTear"
        },
        {
          "label": "关键尺寸1",
          "name": "size1",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "关键尺寸1上限",
          "name": "size1Top",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "关键尺寸1下限",
          "name": "size1Down",
          "id": "u:a918e039e84d",
          "placeholder": "请输入带-号的数字如：-0.3",
          "type": "text"
        },
        {
          "label": "关键尺寸2",
          "name": "size2",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "关键尺寸2上限",
          "name": "size2Top",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "关键尺寸2下限",
          "name": "size2Down",
          "id": "u:a918e039e84d",
          "placeholder": "请输入带-号的数字如：-0.3",
          "type": "text"
        },
        {
          "label": "关键尺寸3",
          "name": "size3",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "关键尺寸3上限",
          "name": "size3Top",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "关键尺寸3下限",
          "name": "size3Down",
          "id": "u:a918e039e84d",
          "placeholder": "请输入带-号的数字如：-0.3",
          "type": "text"
        },
        {
          "label": "实际关键尺寸1上限",
          "name": "realSize1Top",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "实际关键尺寸1下限",
          "name": "realSize1Down",
          "id": "u:a918e039e84d",
          "placeholder": "请输入带-号的数字如：-0.3",
          "type": "text"
        },
        {
          "label": "实际关键尺寸2上限",
          "name": "realSize2Top",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "实际关键尺寸2下限",
          "name": "realSize2Down",
          "id": "u:a918e039e84d",
          "placeholder": "请输入带-号的数字如：-0.3",
          "type": "text"
        },
        {
          "label": "实际关键尺寸3上限",
          "name": "realSize3Top",
          "id": "u:a918e039e84d",
          "placeholder": "-",
          "type": "text"
        },
        {
          "label": "实际关键尺寸3下限",
          "name": "realSize3Down",
          "id": "u:a918e039e84d",
          "placeholder": "请输入带-号的数字如：-0.3",
          "type": "text"
        },
        {
          "type": "operation",
          "label": "操作",
          "width": 140,
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
                "title": "编辑",
                "body": [
                  {
                    "type": "form",
                    "api": "/api/product/update",
                    "body": [
                      {
                        "type": "input-text",
                        "label": "ID",
                        "name": "id",
                        "visible": false,
                        "id": "u:8ab6f0dbdd84"
                      },
                      {
                        "type": "select",
                        "id": "u:618689144def",
                        "label": "客户名称",
                        "name": "customerId",
                        "placeholder": "-",
                        "source": "/api/customer/list",
                        "multiple": false,
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "type": "select",
                        "label": "供给物料",
                        "name": "ptype",
                        "id": "u:618689144def",
                        "placeholder": "-",
                        "source": "/api/product/typeList",
                        "multiple": false,
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "type": "input-text",
                        "label": "订单编号",
                        "name": "orderNo",
                        "id": "u:5a4f709448fb",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "type": "input-text",
                        "id": "u:9d9900e72dd0",
                        "label": "物料编码",
                        "name": "productNo",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "type": "input-text",
                        "id": "u:f3af8cb737f1",
                        "label": "材质",
                        "name": "material",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "type": "input-text",
                        "id": "u:e2c222c4d444",
                        "label": "型号",
                        "name": "size",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "type": "input-text",
                        "id": "u:860df350d63d",
                        "label": "颜色",
                        "name": "color",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "label": "材料硬度",
                        "name": "materialHardness",
                        "id": "u:7c1314e4c101",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "label": "检测硬度",
                        "name": "testHardness",
                        "id": "u:f1af31dca209",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "id": "u:bc51ec0dee99",
                        "type": "input-text",
                        "label": "拉伸强度",
                        "name": "tensileStrength",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "id": "u:9cde794667d2",
                        "type": "input-text",
                        "label": "检测强度",
                        "name": "testStrength",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "id": "u:a88153ffb31f",
                        "type": "input-text",
                        "label": "拉伸延长率",
                        "name": "stretchElongationRate",
                        "placeholder": "-",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "label": "检测延长率",
                        "name": "testElongationRate",
                        "id": "u:d10626f96637",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validateOnChange": true
                      },
                      {
                        "label": "撕裂强度",
                        "name": "tearStrength",
                        "id": "u:788d48f4a597",
                        "placeholder": "-",
                        "type": "input-text",
                        "validateOnChange": true
                      },
                      {
                        "label": "检测撕裂",
                        "name": "testTear",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text",
                        "validateOnChange": true
                      },
                      {
                        "label": "关键尺寸1",
                        "name": "size1",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validations": {
                          "isNumeric": true
                        },
                        "validateOnChange": true
                      },
                      {
                        "label": "关键尺寸1上限",
                        "name": "size1Top",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validations": {
                          "isNumeric": true
                        },
                        "validateOnChange": true
                      },
                      {
                        "label": "关键尺寸1下限",
                        "name": "size1Down",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "label": "关键尺寸2",
                        "name": "size2",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validations": {
                          "isNumeric": true
                        },
                        "validateOnChange": true
                      },
                      {
                        "label": "关键尺寸2上限",
                        "name": "size2Top",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text",
                        "required": true,
                        "validations": {
                          "isNumeric": true
                        },
                        "validateOnChange": true
                      },
                      {
                        "label": "关键尺寸2下限",
                        "name": "size2Down",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "label": "关键尺寸3",
                        "name": "size3",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text"
                      },
                      {
                        "label": "关键尺寸3上限",
                        "name": "size3Top",
                        "id": "u:a918e039e84d",
                        "placeholder": "-",
                        "type": "input-text"
                      },
                      {
                        "label": "关键尺寸3下限",
                        "name": "size3Down",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "label": "实际关键尺寸1上限",
                        "name": "realSize1Top",
                        "id": "u:a918e039e84d",
                        "placeholder": "",
                        "type": "input-text"
                      },
                      {
                        "label": "实际关键尺寸1下限",
                        "name": "realSize1Down",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "label": "实际关键尺寸2上限",
                        "name": "realSize2Top",
                        "id": "u:a918e039e84d",
                        "placeholder": "",
                        "type": "input-text"
                      },
                      {
                        "label": "实际关键尺寸2下限",
                        "name": "realSize2Down",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "label": "实际关键尺寸3上限",
                        "name": "realSize3Top",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "label": "实际关键尺寸1下限",
                        "name": "realSize3Down",
                        "id": "u:a918e039e84d",
                        "placeholder": "请输入带-号的数字如：-0.3",
                        "type": "input-text"
                      },
                      {
                        "name": "productImage",
                        "label": "产品图片",
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
                    "id": "u:3c92d33560e3",
                    "actions": [
                      {
                        "type": "submit",
                        "label": "提交",
                        "primary": true
                      }
                    ],
                    "feat": "Insert",
                    "dsType": "api",
                    "columnCount": 2
                  }
                ],
                "type": "dialog",
                "id": "u:659f2ad67cff",
                "actions": [
                  {
                    "type": "button",
                    "actionType": "cancel",
                    "label": "取消",
                    "id": "u:5c1de43f553e"
                  },
                  {
                    "type": "button",
                    "actionType": "confirm",
                    "label": "确定",
                    "primary": true,
                    "id": "u:f6e76c08fcba"
                  }
                ],
                "showCloseButton": true,
                "closeOnOutside": false,
                "closeOnEsc": false,
                "showErrorMsg": true,
                "showLoading": true,
                "draggable": false,
                "size": "md"
              },
              "id": "u:0a285501ab98"
            },
            {
              "type": "button",
              "label": "下载",
              "level": "link",
              "id": "u:db314f9b7b62",
              "onEvent": {
                "click": {
                  "weight": 0,
                  "actions": [
                    {
                      "ignoreError": false,
                      "actionType": "url",
                      "args": {
                        "url": "/api/product/download?id=${id}"
                      }
                    }
                  ]
                }
              }
            },
            {
              "type": "button",
              "label": "删除",
              "actionType": "ajax",
              "level": "link",
              "id": "u:0fb1fd8941cf",
              "api": {
                "method": "get",
                "url": "/api/product/del?id=${id}"
              },
              "themeCss": {
                "className": {
                  "font:default": {
                    "color": "var(--colors-error-4)"
                  }
                }
              },
              "confirmText": "你确定要删除吗"
            }
          ],
          "id": "u:f4d81e4be7ef",
          "placeholder": "-",
          "fixed": "right"
        }
      ],
      "bulkActions": [],
      "perPageAvailable": [
        10
      ],
      "messages": {},
      "showFooter": false,
      "alwaysShowPagination": true,
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
                "label": "添加",
                "id": "u:fcbc91911e70",
                "actionType": "dialog",
                "dialog": {
                  "type": "dialog",
                  "id": "u:2036b4b48f2a",
                  "actions": [
                    {
                      "type": "button",
                      "actionType": "cancel",
                      "label": "取消",
                      "id": "u:de6986ca7bda"
                    },
                    {
                      "type": "button",
                      "actionType": "confirm",
                      "label": "确定",
                      "primary": true,
                      "id": "u:6bce87bfcda7"
                    }
                  ],
                  "body": [
                    {
                      "id": "u:15f9e38dca96",
                      "type": "form",
                      "title": "",
                      "mode": "horizontal",
                      "dsType": "api",
                      "feat": "Insert",
                      "body": [
                        {
                          "type": "select",
                          "label": "客户名称",
                          "name": "customerId",
                          "id": "u:618689144def",
                          "placeholder": "-",
                          "source": "/api/customer/list",
                          "multiple": false,
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "type": "select",
                          "label": "供给物料",
                          "name": "ptype",
                          "id": "u:618689144def",
                          "placeholder": "-",
                          "source": "/api/product/typeList",
                          "multiple": false,
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "type": "input-text",
                          "label": "订单编号",
                          "name": "orderNo",
                          "id": "u:869c49f35ad1",
                          "placeholder": "多个订单以逗号分隔",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "type": "input-text",
                          "label": "物料编码",
                          "name": "productNo",
                          "id": "u:9d9900e72dd0",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "type": "input-text",
                          "id": "u:f3af8cb737f1",
                          "label": "材质",
                          "name": "material",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "type": "input-text",
                          "label": "型号",
                          "name": "size",
                          "id": "u:e2c222c4d444",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "type": "input-text",
                          "id": "u:860df350d63d",
                          "label": "颜色",
                          "name": "color",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "id": "u:7c1314e4c101",
                          "type": "input-text",
                          "label": "材料硬度",
                          "name": "materialHardness",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "id": "u:f1af31dca209",
                          "type": "input-text",
                          "label": "检测硬度",
                          "name": "testHardness",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "id": "u:bc51ec0dee99",
                          "type": "input-text",
                          "label": "拉伸强度",
                          "name": "tensileStrength",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "id": "u:9cde794667d2",
                          "type": "input-text",
                          "label": "检测强度",
                          "name": "testStrength",
                          "placeholder": "-",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "id": "u:a88153ffb31f",
                          "type": "input-text",
                          "label": "拉伸延长率",
                          "name": "stretchElongationRate",
                          "placeholder": "-",
                          "validateOnChange": true,
                          "required": true
                        },
                        {
                          "label": "检测延长率",
                          "name": "testElongationRate",
                          "id": "u:d10626f96637",
                          "placeholder": "-",
                          "type": "input-text",
                          "required": true,
                          "validateOnChange": true
                        },
                        {
                          "label": "撕裂强度",
                          "name": "tearStrength",
                          "id": "u:788d48f4a597",
                          "placeholder": "-",
                          "type": "input-text",
                          "validateOnChange": true
                        },
                        {
                          "label": "检测撕裂",
                          "name": "testTear",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text",
                          "validateOnChange": true
                        },
                        {
                          "label": "关键尺寸1",
                          "name": "size1",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text",
                          "required": true,
                          "validations": {
                            "isNumeric": true
                          },
                          "validateOnChange": true
                        },
                        {
                          "label": "关键尺寸1上限",
                          "name": "size1Top",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text",
                          "required": true,
                          "validations": {
                            "isNumeric": true
                          }
                        },
                        {
                          "label": "关键尺寸1下限",
                          "name": "size1Down",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "label": "关键尺寸2",
                          "name": "size2",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text",
                          "required": true,
                          "validations": {
                            "isNumeric": true
                          }
                        },
                        {
                          "label": "关键尺寸2上限",
                          "name": "size2Top",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text",
                          "required": true,
                          "validations": {
                            "isNumeric": true
                          }
                        },
                        {
                          "label": "关键尺寸2下限",
                          "name": "size2Down",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "label": "关键尺寸3",
                          "name": "size3",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text"
                        },
                        {
                          "label": "关键尺寸3上限",
                          "name": "size3Top",
                          "id": "u:a918e039e84d",
                          "placeholder": "-",
                          "type": "input-text"
                        },
                        {
                          "label": "关键尺寸3下限",
                          "name": "size3Down",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "label": "实际关键尺寸1上限",
                          "name": "realSize1Top",
                          "id": "u:a918e039e84d",
                          "placeholder": "",
                          "type": "input-text"
                        },
                        {
                          "label": "实际关键尺寸1下限",
                          "name": "realSize1Down",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "label": "实际关键尺寸2上限",
                          "name": "realSize2Top",
                          "id": "u:a918e039e84d",
                          "placeholder": "",
                          "type": "input-text"
                        },
                        {
                          "label": "实际关键尺寸2下限",
                          "name": "realSize2Down",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "label": "实际关键尺寸3上限",
                          "name": "realSize3Top",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "label": "实际关键尺寸1下限",
                          "name": "realSize3Down",
                          "id": "u:a918e039e84d",
                          "placeholder": "请输入带-号的数字如：-0.3",
                          "type": "input-text"
                        },
                        {
                          "name": "productImage",
                          "label": "产品图片",
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
                      "actions": [
                        {
                          "type": "button",
                          "label": "生成文件",
                          "onEvent": {
                            "click": {
                              "actions": [
                                {
                                  "actionType": "setValue",
                                  "componentId": "u:15f9e38dca96",
                                  "args": {
                                    "innerDiameter": 1,
                                    "value": {
                                      "desc": "ccc"
                                    }
                                  },
                                  "ignoreError": false
                                }
                              ]
                            }
                          },
                          "level": "primary",
                          "id": "u:f13e05fa8d5a"
                        }
                      ],
                      "resetAfterSubmit": true,
                      "onEvent": {},
                      "debug": false,
                      "columnCount": 2,
                      "horizontal": {
                        "leftFixed": "normal"
                      },
                      "api": {
                        "url": "/api/product/add",
                        "method": "post",
                        "dataType": "json"
                      }
                    }
                  ],
                  "showCloseButton": true,
                  "closeOnOutside": false,
                  "closeOnEsc": false,
                  "showErrorMsg": true,
                  "showLoading": true,
                  "draggable": false,
                  "size": "md"
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
      }
    }
  ],
  "id": "u:0e3fa0cf2246",
  "data": {
    "id": "0"
  },
  "aside": [
    {
      "type": "flex",
      "className": "p-1",
      "items": [
        {
          "type": "container",
          "body": [
            {
              "type": "button",
              "label": "添加客户",
              "id": "u:56ea61d2300c",
              "level": "default",
              "size": "md",
              "block": true,
              "actionType": "dialog",
              "dialog": {
                "type": "dialog",
                "id": "u:aa3858724b46",
                "actions": [
                  {
                    "type": "button",
                    "actionType": "cancel",
                    "label": "取消",
                    "id": "u:46740eb32932"
                  },
                  {
                    "type": "button",
                    "actionType": "confirm",
                    "label": "确定",
                    "primary": true,
                    "id": "u:1e0e33a856a2",
                    "onEvent": {
                      "click": {
                        "weight": 0,
                        "actions": [
                          {
                            "componentId": "u:e4641f3fcaaa",
                            "ignoreError": false,
                            "outputVar": "submitResult",
                            "actionType": "submit"
                          },
                          {
                            "componentId": "",
                            "ignoreError": false,
                            "actionType": "refresh",
                            "args": {}
                          }
                        ]
                      }
                    }
                  }
                ],
                "body": [
                  {
                    "id": "u:e4641f3fcaaa",
                    "type": "form",
                    "title": "表单",
                    "mode": "horizontal",
                    "dsType": "api",
                    "feat": "Insert",
                    "body": [
                      {
                        "name": "customerName",
                        "label": "客户名称",
                        "type": "input-text",
                        "id": "u:45aaa20af80f"
                      }
                    ],
                    "api": {
                      "url": "/api/customer/add",
                      "method": "post",
                      "requestAdaptor": "",
                      "adaptor": "",
                      "messages": {},
                      "dataType": "json"
                    },
                    "actions": [
                      {
                        "type": "button",
                        "label": "提交",
                        "onEvent": {
                          "click": {
                            "actions": [
                              {
                                "actionType": "submit",
                                "componentId": "u:e4641f3fcaaa"
                              }
                            ]
                          }
                        },
                        "level": "primary"
                      }
                    ],
                    "resetAfterSubmit": true,
                    "bodyClassName": ""
                  }
                ]
              }
            }
          ],
          "size": "xs",
          "style": {
            "position": "static",
            "display": "block",
            "flex": "1 1 auto",
            "flexGrow": 1
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false,
          "id": "u:d95c557d5109"
        }
      ],
      "style": {
        "position": "relative",
        "inset": "auto",
        "flexWrap": "nowrap",
        "alignItems": "flex-start"
      },
      "id": "u:e77f45a3c089",
      "isFixedHeight": false,
      "isFixedWidth": false
    },
    {
      "type": "nav",
      "stacked": true,
      "popupClassName": "app-popover :AMISCSSWrapper",
      "id": "u:c0d6d5dbe305",
      "onEvent": {
        "click": {
          "weight": 0,
          "actions": []
        }
      },
      "source": {
        "url": "/api/customer/list",
        "method": "get",
        "requestAdaptor": "",
        "adaptor": "return payload.data.map((item) => ({ label: item.label, to: `?customerId=${item.value}`, target: '_self', id: item.value }))",
        "messages": {}
      }
    }
  ],
  "asideResizor": false,
  "pullRefresh": {
    "disabled": true
  },
  "wrapperCustomStyle": {}
}

export default schema2component(schema);