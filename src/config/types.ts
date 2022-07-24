import { TResponse } from "@/api/apiTypes";

export interface Config {
  theme: string;
}

export type ConfigResponse = TResponse<Config>