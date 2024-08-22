import dayjs from "dayjs";

interface FormData {
    date: Date;
    startTime: dayjs.Dayjs ;
    endTime: dayjs.Dayjs;
    comments?: string;
}

export type { FormData };