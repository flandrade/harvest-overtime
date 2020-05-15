# harvest-overtime ⏰

[![npm version](https://badge.fury.io/js/harvest-overtime.svg)](https://badge.fury.io/js/harvest-overtime)
[![Build Status](https://github.com/flandrade/harvest-overtime/workflows/harvest-overtime/badge.svg)](https://github.com/flandrade/harvest-overtime/actions)

Command-line interface to calculates employee's overtime with Harvest's CSV reports. Built with TypeScript and Node.js.

- [harvest-overtime ⏰](#harvest-overtime-)
  - [✨ Features and limitations](#-features-and-limitations)
  - [📌 CSV Requirements](#-csv-requirements)
  - [🚀 How to install](#-how-to-install)
  - [🏗 Usage](#-usage)
  - [🔨 Command Line Interface](#-command-line-interface)
  - [📚 Examples](#-examples)
    - [Using the standard regular working day hours](#using-the-standard-regular-working-day-hours)
    - [Changing the regular working day hours](#changing-the-regular-working-day-hours)
    - [Printing the report to the command line](#printing-the-report-to-the-command-line)
  - [📣 Feedback](#-feedback)
  - [License](#license)

⭐ Star me on GitHub — thanks!

## ✨ Features and limitations

- Calculates overtime of employees: generates a report or prints to the command line. See an
  [example](#printing-the-report-to-the-command-line).
- Supports standard full-time work (40 hours per week: 8 hours per day). You can change this value.
  See an [example](#changing-the-regular-working-day-hours).
- Supports any reporting period. It can be a week or several months.
- Includes time per date. See an [example](#-examples).
- Includes both weekdays and weekends. See an [example](#-examples).
- It doesn't support national holidays.
- Specific headers are required. See the next section.

## 📌 CSV Requirements

CSV files should include at least the following data:

- **"Employee?":** whether they are employees or not.
- **"First Name":** the employees' first names.
- **"Last Name":** the employees' last names.
- **"Date":** the employees' date entries from Harvest.
- **"Hours":** the employees' hours entries from Harvest.

Please make sure your CSV is using these headers. See an [example](https://raw.githubusercontent.com/flandrade/harvest-overtime/master/harvest-example.csv).

## 🚀 How to install

```bash
# Global so it can be called from anywhere
npm install -g harvest-overtime
```

You can also use [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) to avoid pollution.

## 🏗 Usage

```bash
harvest-overtime -i [input-file] -o [output-file] -h [working-day-hours] -p
```

Where `input-file` and `output-file` are the path and file for the
input and output. If these file paths are not provided, it will
use the following:

- input: harvest.csv
- output: report.csv

The `-h` option sets the `working-day-hours`. This value defines the
regular working day hours in order to calculate the overtime. If the
value is not provided, it will use 8 hours per day.

This tool generates a report file, but you can add `-p` to print the report
to the command line.

## 🔨 Command Line Interface

```
Usage: harvest-overtime [options]

Options:
  -V, --version           output the version number
  -i, --input [input]     Path and name of the incoming CSV file. If not provided, will be 'harvest.csv'
  -o, --output [output]   Path and name of the resulting CSV file. If not provided, will be 'report.csv'
  -h, --dayhours [output] Regular working day hours. If not provided, will be '8 hours'
  -p, --print             Print report to the standard output. If not set, it won't print the report
  -h, --help              output usage information
```

## 📚 Examples

The Harvest report includes the following data entries. Please note that
this is an extract from the CSV file.

|Employee? | First Name | Last Name | Date       | Hours |
|----------|------------|-----------|------------|-------|
| Yes      | Jane       | Austen    | 2018-08-06 | 4     |
| Yes      | Jane       | Austen    | 2018-08-06 | 4.5   |
| Yes      | Jane       | Austen    | 2018-08-07 | 2.5   |
| Yes      | Jane       | Austen    | 2018-08-07 | 3.5   |
| Yes      | Jane       | Austen    | 2018-08-07 | 3     |
| Yes      | Jane       | Austen    | 2018-08-07 | 0.5   |
| Yes      | Emily      | Bronte    | 2018-08-06 | 1     |
| Yes      | Emily      | Bronte    | 2018-08-06 | 4     |
| Yes      | Emily      | Bronte    | 2018-08-06 | 2     |
| Yes      | Emily      | Bronte    | 2018-08-07 | 8     |
| Yes      | Emily      | Bronte    | 2018-08-07 | 2     |
| Yes      | Emily      | Bronte    | 2018-08-11 | 1     |

### Using the standard regular working day hours

If `-h` is no included, the overtime report will use the standard regular working day
(8 hours per day):

```bash
harvest-overtime -i harvest_time_report_from2018-08-06to2018-08-12.csv -o report.csv
```

|Employee      | Weekdays | Weekends | 2018-08-06 | 2018-08-07 | 2018-08-11 |
|--------------|----------|----------|------------|------------|------------|
| Jane Austen  | 2        | 0        | 8.5        | 9.5        |            |
| Emily Bronte | 1        | 1        | 7          | 10         | 1          |

### Changing the regular working day hours

Add `-h` in order to change the regular working hours. For instance, if the regular working
day has 7 hours:

```bash
harvest-overtime -i harvest_time_report_from2018-08-06to2018-08-12.csv -o report.csv -h 7
```

|Employee      | Weekdays | Weekends | 2018-08-06 | 2018-08-07 | 2018-08-11 |
|--------------|----------|----------|------------|------------|------------|
| Jane Austen  | 4        | 0        | 8.5        | 9.5        |            |
| Emily Bronte | 3        | 1        | 7          | 10         | 1          |

### Printing the report to the command line

Add `-p` in order to print the report. You can also check your report in the
provided `output` file:

```bash
harvest-overtime -i harvest_time_report_from2018-08-06to2018-08-12.csv -o report.csv -p
```

```bash
harvest-overtime ⏰

Regular day hours: 8
Input file: harvest_time_report_from2018-08-06to2018-08-12.csv
Output file: report.csv

┌──────────────┬──────────┬──────────┐
│ Employee     │ Weekdays │ Weekends │
├──────────────┼──────────┼──────────┤
│ Jane Austen  │ 2.0000   │ 0.0000   │
├──────────────┼──────────┼──────────┤
│ Emily Bronte │ 1.0000   │ 1.0000   │
└──────────────┴──────────┴──────────┘
```

## 📣 Feedback
If you have any suggestions or want to let me know what you think of this tool, feel free to open [an issue](https://github.com/flandrade/harvest-overtime/issues).

## License
MIT
