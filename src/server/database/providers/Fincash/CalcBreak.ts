import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IFincash } from '../../models';
import { CashOutflowProvider } from '../CashOutflow';

export const calcBreak = async (cardValue: number, fincash_id: number): Promise<number | Error> => {
    try {
        const fincash = await Knex(ETableNames.fincashs).select('*').where('id', fincash_id).first();
        if (fincash) {
            if (fincash.isFinished) {
                const breakCalc = await getBreak(fincash, cardValue);
                if (!(breakCalc instanceof Error)) {

                    const result = await Knex(ETableNames.fincashs)
                        .update({
                            cardValue,
                            break: breakCalc,
                        })
                        .where('id', fincash_id);

                    if (result > 0) {
                        return breakCalc;
                    } else {
                        return Error('Internal Server Error');
                    }
                } else {
                    return breakCalc; // ERROR
                }

            } else {
                return new Error('Fincash is not finished');
            }
        } else {
            return new Error('Fincash not found');
        }
    } catch (e) {
        console.log(e);
        return new Error('Update Failed');
    }
};


const getBreak = async (fincash: IFincash, cardValue: number): Promise<number | Error> => {
    if ((fincash.finalValue || fincash.finalValue == null) && (fincash.totalValue || fincash.totalValue == null)) {
        if (fincash.finalValue == null) fincash.finalValue = 0;
        if (fincash.totalValue == null) fincash.totalValue = 0;
        const total = await CashOutflowProvider.getTotalById(fincash.id);
        if (!(total instanceof Error)) {
            const TotalCash = Number((fincash.finalValue - fincash.value)) + Number(total);
            const totalValue = TotalCash + Number(cardValue);
            const realBreak = totalValue - Number(fincash.totalValue);
            return realBreak;
        }
        return total;
    }
    return new Error('Get break error (provider)');
};