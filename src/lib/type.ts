
export type Bot = {
  uid: string;
  name: string;
  prompt: string;
  voice: string;
};

export type CallEntry = {
  time: string;
  receivedAt: string;
  type: string;
  event?: string;
  summary?: string | null;
  transcript?: [string, string][] | null;
};
