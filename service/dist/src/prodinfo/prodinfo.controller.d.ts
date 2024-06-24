import { ProdInfoService } from './prodinfo.service';
import { ProdInfoDto, ListDto } from './prodinfo.dto';
import { ProdInfo } from './prodinfo.entity';
export declare class ProdInfoController {
    private prodInfoService;
    constructor(prodInfoService: ProdInfoService);
    getProdInfoList(query: {
        ptype: string;
    } & ListDto): Promise<{
        count: any;
        data: ProdInfo[];
    }>;
    delProdInfo(query: {
        id: number;
    }): Promise<{}>;
    updateProdInfo(body: ProdInfoDto): Promise<import("typeorm").UpdateResult>;
    uploadProdInfo(file: any): Promise<{
        filename: any;
        url: string;
        value: string;
    }>;
    addProdInfo(body: ProdInfoDto): Promise<ProdInfo>;
}
