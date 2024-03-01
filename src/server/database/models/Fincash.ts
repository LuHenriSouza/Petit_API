export interface IFincash {
    id: number,
    opener: string
    value: number,
    obs?: string | null,
    isFinished: boolean,
    finalValue?: number | null,
    finalDate?: Date | null,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date,

}