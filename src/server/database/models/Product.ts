export interface IProduct {
    id: number,
    code: string,
    name: string,
    sector: number,
    price: number,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date

}