export type Brief = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  amId: number | null;
  traderId: number | null;
  status: string;
};