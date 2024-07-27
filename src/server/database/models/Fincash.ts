export interface IFincash {
    id: number,
    opener: string
    value: number,
    obs?: string | null,
    isFinished: boolean,
    finalValue?: number | null,
    totalValue?: number | null,
    cardValue?: number | null,
    invoicing?: number | null,
    profit?: number | null,
    finalDate?: Date | null,
    diferenceLastFincash?: number | null,
    break?: number | null,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date,

}