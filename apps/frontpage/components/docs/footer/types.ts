export interface FeedbackState {
  status?: 'ok' | 'fail';
  message?: string;
  url?: string;
}

export type SendFeedback = (
  prevState: FeedbackState,
  formData: FormData,
) => Promise<FeedbackState>;
