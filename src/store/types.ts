import { z } from "zod";
import { STATUS } from "../middleware/const";

const Status = z.enum([STATUS.LOADING, STATUS.SUCCEEDED, STATUS.IDLE, STATUS.FAILED])
export type Status = z.infer<typeof Status>

const ErrorMessage = z.string()
export type ErrorMessage = z.infer<typeof ErrorMessage> | null