export interface IProdOutput {
    id: number,
    prod_id: number,
    quantity: number,
    reason: string,
    desc?: string,
    fincash_id?: number,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date
}