/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const customer_module_1 = __webpack_require__(/*! ./customer/customer.module */ "./src/customer/customer.module.ts");
const product_module_1 = __webpack_require__(/*! ./product/product.module */ "./src/product/product.module.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const response_1 = __webpack_require__(/*! ./injectable/response */ "./src/injectable/response.ts");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const upload_1 = __webpack_require__(/*! ./injectable/upload */ "./src/injectable/upload.ts");
const prodinfo_module_1 = __webpack_require__(/*! ./prodinfo/prodinfo.module */ "./src/prodinfo/prodinfo.module.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '/uploads'),
                serveRoot: '/uploads',
            }),
            platform_express_1.MulterModule.register((0, upload_1.getMulterConfig)()),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '12345678',
                database: 'autodocx',
                autoLoadEntities: true,
                synchronize: true,
            }),
            customer_module_1.CustomerModule,
            product_module_1.ProductModule,
            prodinfo_module_1.ProdInfoModule
        ],
        providers: [{
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_1.ResponseInterceptor,
            }]
    })
], AppModule);


/***/ }),

/***/ "./src/customer/customer.controller.ts":
/*!*********************************************!*\
  !*** ./src/customer/customer.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const customer_service_1 = __webpack_require__(/*! ./customer.service */ "./src/customer/customer.service.ts");
const customer_dto_1 = __webpack_require__(/*! ./customer.dto */ "./src/customer/customer.dto.ts");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async getCustomerList(query) {
        const res = await this.customerService.getCustomerList(query);
        return query.isList ? res : res?.map((item) => {
            return {
                label: item.ct_name,
                value: item.id,
            };
        });
    }
    async addCustomer(body) {
        const res = await this.customerService.addCustomer({ ct_name: body.customerName, ct_is_delete: body.isDeleted ? 1 : 0 });
        return res;
    }
    async updateCustomer(body) {
        const res = await this.customerService.updateCustomer({ id: body.id, ct_name: body.customerName, ct_is_delete: body.isDeleted ? 1 : 0 });
        return res;
    }
    async removeCustomer(query) {
        const res = await this.customerService.removeCustomer(query.id);
        return res;
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomerList", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.addCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addCustomer", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Get)('/del'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "removeCustomer", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.Controller)('/customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);


/***/ }),

/***/ "./src/customer/customer.dto.ts":
/*!**************************************!*\
  !*** ./src/customer/customer.dto.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCustomerDto = void 0;
class addCustomerDto {
}
exports.addCustomerDto = addCustomerDto;


/***/ }),

/***/ "./src/customer/customer.entity.ts":
/*!*****************************************!*\
  !*** ./src/customer/customer.entity.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Customer = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "ct_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '是否删除 0 否 1 是' }),
    __metadata("design:type", Number)
], Customer.prototype, "ct_is_delete", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);


/***/ }),

/***/ "./src/customer/customer.module.ts":
/*!*****************************************!*\
  !*** ./src/customer/customer.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const customer_controller_1 = __webpack_require__(/*! ./customer.controller */ "./src/customer/customer.controller.ts");
const customer_service_1 = __webpack_require__(/*! ./customer.service */ "./src/customer/customer.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const customer_entity_1 = __webpack_require__(/*! ./customer.entity */ "./src/customer/customer.entity.ts");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer])],
        controllers: [customer_controller_1.CustomerController],
        providers: [customer_service_1.CustomerService],
        exports: [customer_service_1.CustomerService],
    })
], CustomerModule);


/***/ }),

/***/ "./src/customer/customer.service.ts":
/*!******************************************!*\
  !*** ./src/customer/customer.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const customer_entity_1 = __webpack_require__(/*! ./customer.entity */ "./src/customer/customer.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    getCustomerList(where) {
        const { page, pageSize, ctName } = where;
        const skip = page > 0 ? (page - 1) * pageSize : 0;
        const options = {
            where: { ct_name: ctName ? (0, typeorm_2.Like)(`%${ctName}%`) : undefined, ct_is_delete: 0 },
            order: { id: 'DESC' },
            skip,
            take: pageSize
        };
        return this.customerRepository.find(options);
    }
    getCustomerById(id) {
        return this.customerRepository.findOneBy({ id });
    }
    async removeCustomer(id) {
        return this.customerRepository.update({ id }, { ct_is_delete: 1 });
    }
    async updateCustomer(customer) {
        return this.customerRepository.update({ id: customer.id }, customer);
    }
    addCustomer(customer) {
        try {
            return this.customerRepository.save(customer);
        }
        catch (err) {
            console.log(err, '????');
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);


/***/ }),

/***/ "./src/injectable/response.ts":
/*!************************************!*\
  !*** ./src/injectable/response.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => {
            if (!!data) {
                return {
                    status: 0,
                    msg: 'success',
                    data: Array.isArray(data) ? [...data.map((item) => (0, utils_1.snakeToCamelCase)(item))] : { ...(0, utils_1.snakeToCamelCase)(data) }
                };
            }
            return {
                status: 1,
                msg: 'error',
                data: '失败'
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);


/***/ }),

/***/ "./src/injectable/upload.ts":
/*!**********************************!*\
  !*** ./src/injectable/upload.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMulterConfig = void 0;
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
function getMulterConfig() {
    const appRoot = path.resolve(__dirname, '..');
    const uploadDir = path.join(appRoot, 'uploads');
    const multerConfig = {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (_, file, callback) => {
                const fileName = `${Date.now()}-${file.originalname}`;
                return callback(null, fileName);
            },
        })
    };
    return multerConfig;
}
exports.getMulterConfig = getMulterConfig;


/***/ }),

/***/ "./src/prodinfo/prodinfo.controller.ts":
/*!*********************************************!*\
  !*** ./src/prodinfo/prodinfo.controller.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProdInfoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prodinfo_service_1 = __webpack_require__(/*! ./prodinfo.service */ "./src/prodinfo/prodinfo.service.ts");
const prodinfo_dto_1 = __webpack_require__(/*! ./prodinfo.dto */ "./src/prodinfo/prodinfo.dto.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const upload_1 = __webpack_require__(/*! ../injectable/upload */ "./src/injectable/upload.ts");
let ProdInfoController = class ProdInfoController {
    constructor(prodInfoService) {
        this.prodInfoService = prodInfoService;
    }
    async getProdInfoList(query) {
        return await this.prodInfoService.getProdInfoList(query);
    }
    async delProdInfo(query) {
        const { id } = query;
        const res = await this.prodInfoService.removeProdInfo(id);
        if (res) {
            return {};
        }
        return '';
    }
    async updateProdInfo(body) {
        const image = { ...(0, utils_1.camelToSnakeCase)(body) };
        return await this.prodInfoService.updateProdInfo(image);
    }
    async uploadProdInfo(file) {
        return {
            filename: file.filename,
            url: `http://localhost:3000/uploads/${file.filename}`,
            value: `http://localhost:3000/uploads/${file.filename}`
        };
    }
    async addProdInfo(body) {
        const image = { ...(0, utils_1.camelToSnakeCase)(body) };
        return await this.prodInfoService.addProdInfo(image);
    }
};
exports.ProdInfoController = ProdInfoController;
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProdInfoController.prototype, "getProdInfoList", null);
__decorate([
    (0, common_1.Get)('/del'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProdInfoController.prototype, "delProdInfo", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [prodinfo_dto_1.ProdInfoDto]),
    __metadata("design:returntype", Promise)
], ProdInfoController.prototype, "updateProdInfo", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, upload_1.getMulterConfig)())),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProdInfoController.prototype, "uploadProdInfo", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [prodinfo_dto_1.ProdInfoDto]),
    __metadata("design:returntype", Promise)
], ProdInfoController.prototype, "addProdInfo", null);
exports.ProdInfoController = ProdInfoController = __decorate([
    (0, common_1.Controller)('/prodinfo'),
    __metadata("design:paramtypes", [prodinfo_service_1.ProdInfoService])
], ProdInfoController);


/***/ }),

/***/ "./src/prodinfo/prodinfo.dto.ts":
/*!**************************************!*\
  !*** ./src/prodinfo/prodinfo.dto.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListDto = exports.ProdInfoDto = void 0;
class ProdInfoDto {
}
exports.ProdInfoDto = ProdInfoDto;
class ListDto {
}
exports.ListDto = ListDto;


/***/ }),

/***/ "./src/prodinfo/prodinfo.entity.ts":
/*!*****************************************!*\
  !*** ./src/prodinfo/prodinfo.entity.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProdInfo = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let ProdInfo = class ProdInfo {
};
exports.ProdInfo = ProdInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProdInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdInfo.prototype, "ptype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdInfo.prototype, "image_left", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdInfo.prototype, "image_right", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdInfo.prototype, "center_x1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProdInfo.prototype, "center_x2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdInfo.prototype, "center_y1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProdInfo.prototype, "center_y2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdInfo.prototype, "real_center1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProdInfo.prototype, "real_center2", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '是否删除 0 否 1 是' }),
    __metadata("design:type", Number)
], ProdInfo.prototype, "is_deleted", void 0);
exports.ProdInfo = ProdInfo = __decorate([
    (0, typeorm_1.Entity)()
], ProdInfo);


/***/ }),

/***/ "./src/prodinfo/prodinfo.module.ts":
/*!*****************************************!*\
  !*** ./src/prodinfo/prodinfo.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProdInfoModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prodinfo_controller_1 = __webpack_require__(/*! ./prodinfo.controller */ "./src/prodinfo/prodinfo.controller.ts");
const prodinfo_service_1 = __webpack_require__(/*! ./prodinfo.service */ "./src/prodinfo/prodinfo.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const prodinfo_entity_1 = __webpack_require__(/*! ./prodinfo.entity */ "./src/prodinfo/prodinfo.entity.ts");
let ProdInfoModule = class ProdInfoModule {
};
exports.ProdInfoModule = ProdInfoModule;
exports.ProdInfoModule = ProdInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prodinfo_entity_1.ProdInfo])],
        controllers: [prodinfo_controller_1.ProdInfoController],
        providers: [prodinfo_service_1.ProdInfoService],
        exports: [prodinfo_service_1.ProdInfoService],
    })
], ProdInfoModule);


/***/ }),

/***/ "./src/prodinfo/prodinfo.service.ts":
/*!******************************************!*\
  !*** ./src/prodinfo/prodinfo.service.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProdInfoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const prodinfo_entity_1 = __webpack_require__(/*! ./prodinfo.entity */ "./src/prodinfo/prodinfo.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let ProdInfoService = class ProdInfoService {
    constructor(imagesRepository) {
        this.imagesRepository = imagesRepository;
    }
    async getProdInfoList(where) {
        const { page, pageSize, ptype } = where;
        const skip = page > 0 ? (page - 1) * pageSize : 0;
        const count = await this.imagesRepository.count({ where: { is_deleted: 0, ptype } });
        const data = await this.imagesRepository.find({ where: { is_deleted: 0, ptype }, order: { id: 'DESC' }, skip, take: pageSize });
        return { count, data };
    }
    async getProdInfoByType(where) {
        const opt = where.ptype === 'oxq' ? where : [{ ptype: 'yxq', is_deleted: 0 }, { ptype: 'pw', is_deleted: 0 }];
        return await this.imagesRepository.find({ where: opt });
    }
    async removeProdInfo(id) {
        return this.imagesRepository.update({ id }, { is_deleted: 1 });
    }
    async addProdInfo(images) {
        return await this.imagesRepository.save(images);
    }
    async updateProdInfo(images) {
        const originProdInfo = await this.imagesRepository.findOneBy({ id: images.id });
        return this.imagesRepository.update(originProdInfo, images);
    }
};
exports.ProdInfoService = ProdInfoService;
exports.ProdInfoService = ProdInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prodinfo_entity_1.ProdInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdInfoService);


/***/ }),

/***/ "./src/product/const.ts":
/*!******************************!*\
  !*** ./src/product/const.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PW = exports.YXQ = exports.OXQ = exports.ProductName = exports.Pd = void 0;
var Pd;
(function (Pd) {
    Pd["pw"] = "pw";
    Pd["oxq"] = "oxq";
    Pd["yxq"] = "yxq";
})(Pd || (exports.Pd = Pd = {}));
var ProductName;
(function (ProductName) {
    ProductName["pw"] = "\u76AE\u7897";
    ProductName["oxq"] = "O\u578B\u6A61\u80F6\u5708";
    ProductName["yxq"] = "Y\u578B\u6A61\u80F6\u5708";
})(ProductName || (exports.ProductName = ProductName = {}));
var OXQ;
(function (OXQ) {
    OXQ[OXQ["inner"] = 10] = "inner";
    OXQ[OXQ["innerRange"] = 0.19] = "innerRange";
    OXQ[OXQ["line"] = 3.2] = "line";
    OXQ[OXQ["lineRange"] = 0.1] = "lineRange";
})(OXQ || (exports.OXQ = OXQ = {}));
var YXQ;
(function (YXQ) {
    YXQ[YXQ["inner"] = 86] = "inner";
    YXQ[YXQ["innerRange"] = 0.7] = "innerRange";
    YXQ[YXQ["out"] = 102.8] = "out";
    YXQ[YXQ["outRange"] = 0.7] = "outRange";
    YXQ[YXQ["height"] = 6.5] = "height";
    YXQ[YXQ["heightRange"] = 2] = "heightRange";
})(YXQ || (exports.YXQ = YXQ = {}));
var PW;
(function (PW) {
    PW[PW["radius"] = 24] = "radius";
    PW[PW["radiusRange"] = 0.25] = "radiusRange";
    PW[PW["diameter"] = 55] = "diameter";
    PW[PW["diameterRange"] = 0.5] = "diameterRange";
    PW[PW["height"] = 44] = "height";
    PW[PW["heightRange"] = 0.5] = "heightRange";
})(PW || (exports.PW = PW = {}));


/***/ }),

/***/ "./src/product/product.controller.ts":
/*!*******************************************!*\
  !*** ./src/product/product.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_dto_1 = __webpack_require__(/*! ./product.dto */ "./src/product/product.dto.ts");
const product_service_1 = __webpack_require__(/*! ./product.service */ "./src/product/product.service.ts");
const prodinfo_service_1 = __webpack_require__(/*! ../prodinfo/prodinfo.service */ "./src/prodinfo/prodinfo.service.ts");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const const_1 = __webpack_require__(/*! ./const */ "./src/product/const.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/product/utils.ts");
const index_1 = __webpack_require__(/*! ../utils/index */ "./src/utils/index.ts");
const dayjs = __webpack_require__(/*! dayjs */ "dayjs");
const customer_service_1 = __webpack_require__(/*! ../customer/customer.service */ "./src/customer/customer.service.ts");
let ProductController = class ProductController {
    constructor(prodInfoService, productService, customerService) {
        this.prodInfoService = prodInfoService;
        this.productService = productService;
        this.customerService = customerService;
    }
    async getProducts(query) {
        return await this.productService.getProductList(query);
    }
    getProductTypeList() {
        return [{
                label: const_1.ProductName.pw,
                value: const_1.Pd.pw
            }, {
                label: const_1.ProductName.oxq,
                value: const_1.Pd.oxq
            }, {
                label: const_1.ProductName.yxq,
                value: const_1.Pd.yxq
            }];
    }
    async delProduct(query) {
        const { id } = query;
        return await this.productService.removeProduct(id);
    }
    async download(query, response) {
        let res = await this.productService.getProductById(query);
        let customer = await this.customerService.getCustomerById(res.id);
        let prodInfoList = await this.prodInfoService.getProdInfoByType({ ptype: res.ptype });
        if (!res || !prodInfoList)
            return '';
        const result = (0, index_1.snakeToCamelCase)(res);
        const docData = (0, utils_1.generateRolerance)(result);
        prodInfoList = (0, index_1.getRandomList)(prodInfoList).map((item, index) => {
            const res = (0, index_1.snakeToCamelCase)(item);
            const halfKey = 'half';
            const key = ['size1', 'size2', 'size3'];
            res[key[0]] = docData[key[0] + index].toFixed(3) + '';
            res[halfKey + key[0]] = (docData[key[0] + index] / 2).toFixed(3) + '';
            res[key[1]] = docData[key[1] + index].toFixed(3) + '';
            res[halfKey + key[1]] = (docData[key[1] + index] / 2).toFixed(3) + '';
            res[key[2]] = docData[key[2] + index] ? docData[key[2] + index]?.toFixed(3) + '' : '';
            return res;
        });
        const obj = {
            ...(0, index_1.convertUndefinedToEmptyString)(result),
            ...{
                size1Title: `${result.size1}${result.size1Top ? '+' + result.size1Top : ''}/${result.size1Down || ''}`,
                size2Title: result.size2 ? `${result.size2}${result.size2Top ? '+' + result.size2Top : ''}/${result.size2Down || ''}` : '',
                size3Title: result.size3 ? `${result.size3}${result.size3Top ? '+' + result.size3Top : ''}/${result.size3Down || ''}` : ''
            }
        };
        const { filePath, fileName } = (0, index_1.renderDataToDocx)(path.join(__dirname, `./assets/template/${const_1.ProductName[result.ptype]}.docx`), {
            ...docData,
            ...obj,
            ...(0, index_1.snakeToCamelCase)(customer),
            orderNo: result.orderNo.replace(',', "\n"),
            prodInfoList,
            productName: const_1.ProductName[result.ptype],
            dateSplitPoint: dayjs().format('YYYY.MM.DD'),
            date: dayjs().format('YYYY年MM月DD日'),
            time: dayjs().format('HH:mm')
        });
        if (!fs.existsSync(filePath)) {
            return false;
        }
        response.setHeader('Content-Disposition', `attachment; filename="${fileName}.docx"`);
        response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        const filestream = fs.createReadStream(filePath);
        filestream.pipe(response);
    }
    addProduct(body) {
        const data = { ...(0, index_1.camelToSnakeCase)(body) };
        return this.productService.addProduct(data);
    }
    updateProduct(body) {
        const product = { ...(0, index_1.camelToSnakeCase)(body) };
        return this.productService.updateProduct(product);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.getProductListDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('/typeList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductTypeList", null);
__decorate([
    (0, common_1.Get)('/del'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delProduct", null);
__decorate([
    (0, common_1.Get)('/download'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.downloadProductDocxDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "download", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('/product'),
    __metadata("design:paramtypes", [prodinfo_service_1.ProdInfoService,
        product_service_1.ProductService,
        customer_service_1.CustomerService])
], ProductController);


/***/ }),

/***/ "./src/product/product.dto.ts":
/*!************************************!*\
  !*** ./src/product/product.dto.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadProductDocxDto = exports.getProductListDto = exports.ProductDto = void 0;
class ProductDto {
}
exports.ProductDto = ProductDto;
class getProductListDto {
}
exports.getProductListDto = getProductListDto;
class downloadProductDocxDto {
}
exports.downloadProductDocxDto = downloadProductDocxDto;


/***/ }),

/***/ "./src/product/product.entity.ts":
/*!***************************************!*\
  !*** ./src/product/product.entity.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "product_image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "product_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "order_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "ptype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '规格型号' }),
    __metadata("design:type", String)
], Product.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "material_hardness", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "tensile_strength", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "stretch_elongation_rate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "test_strength", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "test_hardness", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "test_elongation_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '撕裂强度' }),
    __metadata("design:type", String)
], Product.prototype, "tear_strength", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '检测拉断' }),
    __metadata("design:type", String)
], Product.prototype, "test_tear", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "size1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "size1_top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "size1_down", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "size2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "size2_top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "size2_down", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "size3", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "size3_top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "size3_down", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "real_size1_top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "real_size1_down", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "real_size2_top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "real_size2_down", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "real_size3_top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "real_size3_down", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '是否删除 0 否 1 是' }),
    __metadata("design:type", Number)
], Product.prototype, "is_deleted", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);


/***/ }),

/***/ "./src/product/product.module.ts":
/*!***************************************!*\
  !*** ./src/product/product.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_controller_1 = __webpack_require__(/*! ./product.controller */ "./src/product/product.controller.ts");
const product_service_1 = __webpack_require__(/*! ./product.service */ "./src/product/product.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const product_entity_1 = __webpack_require__(/*! ./product.entity */ "./src/product/product.entity.ts");
const prodinfo_module_1 = __webpack_require__(/*! ../prodinfo/prodinfo.module */ "./src/prodinfo/prodinfo.module.ts");
const customer_module_1 = __webpack_require__(/*! ../customer/customer.module */ "./src/customer/customer.module.ts");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            customer_module_1.CustomerModule,
            prodinfo_module_1.ProdInfoModule,
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
    })
], ProductModule);


/***/ }),

/***/ "./src/product/product.service.ts":
/*!****************************************!*\
  !*** ./src/product/product.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_entity_1 = __webpack_require__(/*! ./product.entity */ "./src/product/product.entity.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getProductList(query) {
        const { customerId } = query;
        const options = {
            where: { customer_id: customerId, is_deleted: 0 },
            order: { id: 'DESC' }
        };
        const count = await this.productRepository.count(options);
        const data = await this.productRepository.find(options);
        return { count, data };
    }
    async getProductById(query) {
        return await this.productRepository.findOneBy(query);
    }
    async addProduct(product) {
        return this.productRepository.save(product);
    }
    async removeProduct(id) {
        return this.productRepository.update({ id }, { is_deleted: 1 });
    }
    async updateProduct(product) {
        return this.productRepository.update({ id: product.id }, product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductService);


/***/ }),

/***/ "./src/product/utils.ts":
/*!******************************!*\
  !*** ./src/product/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getArray = exports.generateRolerance = exports.getRangeArray = exports.createObjectWithBaseName = void 0;
function createObjectWithBaseName(baseName, array) {
    if (!array)
        return undefined;
    const result = {};
    array.forEach((item, index) => {
        const key = `${baseName}${index}`;
        result[key] = item?.url || item;
    });
    return result;
}
exports.createObjectWithBaseName = createObjectWithBaseName;
function getRangeArray({ base, size = 10, max, min }) {
    const lowerBound = base + (min > 0 ? -min : min);
    const upperBound = base + max;
    if (lowerBound > upperBound) {
        throw new Error('Invalid range: lowerBound is greater than upperBound.');
    }
    const list = [];
    const firstRandomValue = Math.random() * (upperBound - lowerBound) + lowerBound;
    const isGreaterThanBase = firstRandomValue >= base;
    for (let i = 0; i < size; i++) {
        let randomValue;
        if (isGreaterThanBase) {
            randomValue = Math.random() * (upperBound - base) + base;
        }
        else {
            randomValue = Math.random() * (base - lowerBound) + lowerBound;
        }
        list.push(parseFloat(randomValue.toFixed(3)));
    }
    return list;
}
exports.getRangeArray = getRangeArray;
function generateRolerance(data) {
    return {
        ...createObjectWithBaseName('size1', getRangeArray({ base: Number(data.size1), min: Number(data.realSize1Down || data.size1Down), max: Number(data.realSize1Top || data.size1Top) })),
        ...createObjectWithBaseName('size2', getRangeArray({ base: Number(data.size2), min: Number(data.realSize2Down || data.size2Down), max: Number(data.realSize2Top || data.size2Top) })),
        ...createObjectWithBaseName('size3', data.size3 ? getRangeArray({ base: Number(data.size3), min: Number(data.realSize3Down || data.size3Down), max: Number(data.realSize3Top || data.size3Down) }) : getArray())
    };
}
exports.generateRolerance = generateRolerance;
function getArray() {
    const arr = Array(10).fill('');
    return arr;
}
exports.getArray = getArray;


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertUndefinedToEmptyString = exports.getRandomList = exports.renderDataToDocx = exports.fileToBase64 = exports.snakeToCamelCase = exports.camelToSnakeCase = void 0;
const docxtemplater_1 = __webpack_require__(/*! docxtemplater */ "docxtemplater");
const pizzip_1 = __webpack_require__(/*! pizzip */ "pizzip");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const Expressions = __webpack_require__(/*! angular-expressions */ "angular-expressions");
const ImageModule = __webpack_require__(/*! docxtemplater-image-module-free */ "docxtemplater-image-module-free");
function camelToSnakeCase(obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
        const snakeKey = key.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`);
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            result[snakeKey] = camelToSnakeCase(obj[key]);
        }
        else {
            result[snakeKey] = obj[key];
        }
    });
    return result;
}
exports.camelToSnakeCase = camelToSnakeCase;
function snakeToCamelCase(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const isArray = Array.isArray(obj);
    const result = isArray ? [] : {};
    Object.keys(obj).forEach(key => {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        const value = obj[key];
        if (isArray) {
            result.push(snakeToCamelCase(value));
        }
        else {
            result[camelCaseKey] = (typeof value === 'object' && value !== null)
                ? snakeToCamelCase(value)
                : value;
        }
    });
    return result;
}
exports.snakeToCamelCase = snakeToCamelCase;
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                const base64Image = data.toString('base64');
                resolve(`data:image/png;base64,${base64Image}`);
            }
        });
    });
}
exports.fileToBase64 = fileToBase64;
function base64DataURLToArrayBuffer(dataURL) {
    const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
    if (!base64Regex.test(dataURL)) {
        return false;
    }
    const stringBase64 = dataURL.replace(base64Regex, "");
    let binaryString;
    if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
    }
    else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
    }
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
}
function renderDataToDocx(filePath, data) {
    const opts = {
        centered: false,
        fileType: "docx",
        getImage: (tagValue) => {
            return fs.readFileSync(tagValue.replace("http://localhost:3000/", ""));
        },
        getSize: (img, tagValue, tagName) => {
            if (tagName === 'productImage') {
                return [480, 390];
            }
            return [260, 185];
        }
    };
    const imageModule = new ImageModule(opts);
    const content = fs.readFileSync(filePath, "binary");
    const zip = new pizzip_1.default(content);
    const doc = new docxtemplater_1.default(zip, {
        modules: [imageModule],
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render(data);
    const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: "DEFLATE",
    });
    const fileName = new Date().getTime();
    fs.writeFileSync(path.resolve(__dirname, `./assets/output/${fileName}.docx`), buf);
    return { filePath: path.join(__dirname, `./assets/output/${fileName}.docx`), fileName };
}
exports.renderDataToDocx = renderDataToDocx;
function getRandomList(arr, count = 10) {
    if (count > arr.length) {
        return arr;
    }
    let tempArray = [...arr];
    let result = [];
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * tempArray.length);
        result.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return result;
}
exports.getRandomList = getRandomList;
function convertUndefinedToEmptyString(obj) {
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (obj[key] === undefined || obj[key] === null) {
            obj[key] = '';
        }
    }
    return obj;
}
exports.convertUndefinedToEmptyString = convertUndefinedToEmptyString;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "angular-expressions":
/*!**************************************!*\
  !*** external "angular-expressions" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("angular-expressions");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ "docxtemplater":
/*!********************************!*\
  !*** external "docxtemplater" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("docxtemplater");

/***/ }),

/***/ "docxtemplater-image-module-free":
/*!**************************************************!*\
  !*** external "docxtemplater-image-module-free" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("docxtemplater-image-module-free");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "pizzip":
/*!*************************!*\
  !*** external "pizzip" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("pizzip");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*'
    });
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;