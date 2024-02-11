export type SuccessGeneralResponse = {
  success: boolean;
  message: string;
};

export type SuccessResponseData<SuccessData> = SuccessGeneralResponse & {
  data: SuccessData;
};