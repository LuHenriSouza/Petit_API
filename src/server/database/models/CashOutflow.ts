export interface ICashOutflow {
    id: number,
    type_id: number,
    fincash_id: number,
    value: number,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date,
    
}