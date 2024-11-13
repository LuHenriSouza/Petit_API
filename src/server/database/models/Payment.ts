export interface IPayment {
    id: number,
    supplier_id: number,
    code: string,
    expiration: Date,
    value: number,
    desc?: string,
    paid?: Date,
    created_at: Date,
    updated_at: Date,
}