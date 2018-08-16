export interface Employee {
  readonly date: string,
  readonly employee: boolean,
  readonly firstName: string,
  readonly hours: number,
  readonly lastName: string
}

export type Report = { [key: string]: ReportEmployee[] };

type ReportEmployee = { [key: string]: number };
