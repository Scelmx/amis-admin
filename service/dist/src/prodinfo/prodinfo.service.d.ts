import { ProdInfo } from './prodinfo.entity';
import { Repository } from 'typeorm';
import { ListDto } from './prodinfo.dto';
export declare class ProdInfoService {
    private imagesRepository;
    constructor(imagesRepository: Repository<ProdInfo>);
    getProdInfoList(where: ListDto & {
        ptype: string;
    }): Promise<{
        count: any;
        data: ProdInfo[];
    }>;
    getProdInfoByType(where: Pick<ProdInfo, 'ptype'>): Promise<ProdInfo[]>;
    removeProdInfo(id: number): Promise<import("typeorm").UpdateResult>;
    addProdInfo(images: ProdInfo): Promise<ProdInfo>;
    updateProdInfo(images: ProdInfo): Promise<import("typeorm").UpdateResult>;
}
