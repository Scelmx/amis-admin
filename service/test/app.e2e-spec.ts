import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {assignNewOrderToMachines} from "./../src/order/utils";
import {getWhiteTime ,getBlackTime} from "../src/utils/sailings";

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//
//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();
//
//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });
//
//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
//
describe("function test",()=>{
  class Order {
    id;
    nums ;
    startTime ;
    deliveryTime ;
    latestStartTime ;
    requireMold ;
    type;
    priority;
    createdAt;
    constructor(
        id,
        nums,
        startTime,
        deliveryTime,
        latestStartTime,
        requireMold,
        type,
        priority ,
        createdAt,
    ) {
      this.id = id; // 订单ID
      this.nums = nums; // 订单数量
      this.startTime = startTime; // 开始时间
      this.deliveryTime = deliveryTime; // 交付时间
      this.latestStartTime = latestStartTime; // 最晚开始时间
      this.requireMold = requireMold; // 需要的模具
      this.type = type; // 订单产品类型
      this.priority  = priority ; // 订单优先级
      this.createdAt  = createdAt ; // 订单添加时间
    }
  }
  let machines = [
    {
      id: 4,
      type: 'O型圈/垫片,工业膜8寸',
      region : 150,
      mold:{
        produceName:"O型圈",
        templateNo:"YY-151",
        templateModel:"18x2.65",
        templateSize:"",
        hole:400,
        mode:150,
        halfDayNums:60000
      },
      orders: [
        new Order(
            1,
            "1000",
            null,
            1732896000000,
            1732895280000,
            "YY-151",
            'O型圈',
            1,
            1730253600000,
        ),
        new Order(
            3,
            "2000",
            null,
            1733155200000,
            1733153760000,
            "YY-151",
            'O型圈',
            1,
            1730253600000,
        ),
      ],
    },
    {
      id: 7,
      type: '密封圈,工业膜4寸',
      dayNums: 150,
      mold:{
        produceName:"密封圈",
        templateNo:"YY-144",
        templateModel:"海通 T字 机套40x55x23",
        templateSize:"",
        hole:42,
        mode:150,
        halfDayNums:6300
      },
      orders: [
        new Order(
            2,
            "1000",
            null,
            1726761600000,
            1726754742000,
            "YY-144",
            '密封圈',
            1,
            1730253600000,
        ),
        new Order(
            4,
            "1000",
            null,
            1732982400000,
            1732975542000,
            "YY-144",
            '密封圈',
            1,
            1730253600000,
        ),
      ],
    },
    {
      id: 6,
      type: 'O型圈/垫片,工业膜8寸',
      dayNums: 150,
      mold:{
        produceName:"工业膜",
        templateNo:"YY-015",
        templateModel:"99.51x81.78x6.55（4040新款）",
        templateSize:"500*500*65",
        hole:16,
        mode:150,
        halfDayNums:2400
      },
      orders: [
        new Order(
            5,
            "1000",
            null,
            1733932800000,
            1733914800000,
            "YY-015",
            '工业膜8寸',
            1,
            1730253600000,
        ),
      ],
    },
    {
      id: 2,
      type: '密封圈',
      dayNums: 150,
      mold:{
        produceName:"密封圈",
        templateNo:"YY-028",
        templateModel:"43*54.8*23.1（新款1812F型）",
        templateSize:"500*430*70",
        hole:42,
        mode:150,
        halfDayNums:6300
      },
      orders: [
        new Order(
            6,
            "1000",
            null,
            1734192000000,
            1734185142000,
            "YY-028",
            '密封圈',
            1,
            1730253600000,
        ),
      ],
    },
  ].map((item) => ({
    ...item,
    addOrder(order) {
      this.orders.push(order);
    },
  }));
  it("test util",() => {
    let order =  new Order(
        100,
        2000,
        null,
        1718640000000,
        null,
        "YY-028",
        '密封圈',
        3,
        1713405600000,
    )
    let position = assignNewOrderToMachines(order,machines);
    console.log(position)
  })
})
// describe("",()=>{
//   it("",()=>{
//     debugger
//     var whiteTime = getWhiteTime();
//     var blackTime = getBlackTime();
//     console.log(whiteTime);
//   })
// })
