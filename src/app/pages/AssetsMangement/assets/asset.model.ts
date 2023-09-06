export class Asset {
    constructor(
        public id: number,
        public name: string,
        public address: string,
        public physicalStatus: number,
        public ownerShipType: number,
        public usageType: number,
        public type: number,
        public legalStatus: number,
        public photo: string,
        public legalDocument: string,
        public rentalStatus: number,
        public notes: string,
    ) { }

}