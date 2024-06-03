import { z } from "zod";
import { REDUCER_STATUS, SENDING_STATUS } from "../middleware/const";

export const TransactionErrorFieldsEnum = z.enum(["sender", "receiver", "amount"]);
export type TransactionErrorFields = z.infer<typeof TransactionErrorFieldsEnum>;

export const TransactionSenderOptionEnum = z.enum(["own", "allowance"]);
export type TransactionSenderOption = z.infer<typeof TransactionSenderOptionEnum>;

export const TransactionReceiverOptionEnum = z.enum(["own", "third"]);
export type TransactionReceiverOption = z.infer<typeof TransactionReceiverOptionEnum>;

export const TransactionScannerOptionEnum = z.enum(["sender", "receiver", "none"]);
export type TransactionScannerOption = z.infer<typeof TransactionScannerOptionEnum>;

const Status = z.enum([REDUCER_STATUS.LOADING, REDUCER_STATUS.SUCCEEDED, REDUCER_STATUS.IDLE, REDUCER_STATUS.FAILED])
export type Status = z.infer<typeof Status>

const ErrorMessage = z.string()
export type ErrorMessage = z.infer<typeof ErrorMessage> | null

export const SendingStatusEnum = z.enum([SENDING_STATUS.SENDING, SENDING_STATUS.DONE, SENDING_STATUS.ERROR, SENDING_STATUS.NONE]);
export type SendingStatus = z.infer<typeof SendingStatusEnum>;
