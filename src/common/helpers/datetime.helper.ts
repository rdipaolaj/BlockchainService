// src/common/helpers/datetime.helper.ts
import { DateTime } from 'luxon';

export class DatetimeHelper {
    private static readonly timeZone = 'America/Lima'; // Equivalente a "SA Pacific Standard Time"

    static now(): Date {
        return DateTime.now().setZone(this.timeZone).toJSDate();
    }
}