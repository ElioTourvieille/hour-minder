import dayjs from "dayjs";

interface FormData {
    date: Date;
    startTime: dayjs.Dayjs ;
    endTime: dayjs.Dayjs;
    pauseDuration: number;
}

export type { FormData };