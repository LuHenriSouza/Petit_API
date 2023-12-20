export interface ICashOutflow {
    id: number,
    type: string,
    fincash_id: number,
    value: number,
    desc?: string | null,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date,
    
}