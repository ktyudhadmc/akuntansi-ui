export interface ICurrentPeriodResponse {
  status?: string;
  message: string;
  data: PeriodResponse;
}

export interface PeriodResponse {
  current: Period;
  opens: Period[];
}

export interface Period {
  id: string;
  company: Company;
  //   year: string;
  //   month: string;
  start_date: Date;
  end_date: Date | null;
  is_current: boolean;
  is_locked: boolean;
  is_closed: boolean;
  closed_at: Date | null;
  locked_at: Date | null;
}

interface Company {
  id: string;
  name: string;
  code: string;
}
