export interface Employee {
  readonly date: string,
  readonly employee: boolean,
  readonly firstName: string,
  readonly hours: number,
  readonly lastName: string
}

export interface ReportEmployee {
  employee: string;
  report: Report;
  timesheet: Timesheet[];
}

export interface Report {
  weekdays: number,
  weekends: number
}

export interface Timesheet {
  date: string,
  hours: number,
  isWeekend: boolean
}
