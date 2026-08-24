import type { Show } from "./shows";

// Set data structure for backend API response

export interface API {
  success: boolean;
  status: number;
  message: string;
  data: Array<Show>;
}