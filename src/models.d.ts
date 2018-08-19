export interface Employee {
  readonly date: string;
  readonly employee: boolean;
  readonly hours: number;
  readonly name: string;
}

export interface ReportEmployee {
  employee: string;
  report: Report;
  timesheet: Timesheet[];
}

export interface Report {
  weekdays: number;
  weekends: number;
}

export interface Timesheet {
  date: string;
  hours: number;
  isWeekend: boolean;
}
