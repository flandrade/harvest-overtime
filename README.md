# harvest-overtime

[![npm version](https://badge.fury.io/js/harvest-overtime.svg)](https://badge.fury.io/js/harvest-overtime)
[![Build Status](https://github.com/flandrade/harvest-overtime/workflows/harvest-overtime/badge.svg)](https://github.com/flandrade/harvest-overtime/actions)

⭐ Star me on GitHub — thanks!

- [harvest-overtime](#harvest-overtime)
  - [🗒 Description](#%f0%9f%97%92-description)
  - [✨ Features and limitations](#%e2%9c%a8-features-and-limitations)
  - [📌 CSV Requirements](#%f0%9f%93%8c-csv-requirements)
  - [🚀 How to install](#%f0%9f%9a%80-how-to-install)
  - [🏗 Usage](#%f0%9f%8f%97-usage)
  - [🔨 Command Line Interface](#%f0%9f%94%a8-command-line-interface)
  - [📚 Examples](#%f0%9f%93%9a-examples)
  - [📣 Feedback](#%f0%9f%93%a3-feedback)
  - [License](#license)

## 🗒 Description
This is a CLI to calculates employee's overtime with Harvest's CSV reports. Built with TypeScript and Node.js.

## ✨ Features and limitations

- Calculates overtime of employees.
- Only supports full-time work, 40 hours per week.
- Supports any report period. It can be a week or several months.
- Report includes time per dates. See an [example](#examples).
- Overtime's report for both weekdays and weekends. See an [example](#examples).
- Doesn't support national holidays.
- Specific headers are required.

## 📌 CSV Requirements

CSV files should include at least the following data:

- **"Employee?":** whether they are employees or not.
- **"First Name":** the employees' first names.
- **"Last Name":** the employees' last names.
- **"Date":** the employees' date entries from Harvest.
- **"Hours":** the employees' hours entries from Harvest.

Please make sure your CSV is using these same headers.

## 🚀 How to install

```bash
# Global so it can be call from anywhere
$ npm install -g harvest-overtime
```

You can also use [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) to avoid pollution.

## 🏗 Usage

```bash
harvest-overtime -i [input-file] -o [output-file]
```

Where `input-file` and `output-file` are the path and file for the
input and output. If these file paths are not provided, it will
use the following:

- input: harvest.csv
- output: report.csv

## 🔨 Command Line Interface

```
Usage: harvest-overtime [options]

Options:
  -V, --version          output the version number
  -i, --input [input]    Path and name of the incoming CSV file. If not provided, will be 'harvest.csv'
  -o, --output [output]  Path and name of the resulting CSV file. If not provided, will be 'report.csv'
  -h, --help             output usage information
```

## 📚 Examples

```bash
harvest-overtime -i harvest_time_report_from2018-08-06to2018-08-12.csv -o report.csv
```

The overtime report (`report.csv`) is:

|Employee      | Weekdays | Weekends | 2018-08-06 | 2018-08-07 | 2018-08-11 |
|--------------|----------|----------|------------|------------|------------|
| Jane Austen  | 2        | 0        | 8.5        | 9.5        |            |
| Emily Bronte | 1        | 1        | 7          | 10         | 1          |

The Harvest's report includes the following data entries. Please note that
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

## 📣 Feedback
If you have any suggestions or want to let me know what you think of this tool, feel free to open [an issue](https://github.com/flandrade/harvest-overtime/issues).

## License
MIT
