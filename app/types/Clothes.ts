

export type ClothesType = 'top' | 'bottom' | 'accessory' | 'hat' | 'shoes';

export type Clothes = {
    id: number;
    type: ClothesType;
    color: string;
    path: string;
};
