# harvest-overtime

[![Build Status](https://travis-ci.org/flandrade/harvest-overtime.svg?branch=master)](https://travis-ci.org/flandrade/harvest-overtime)

Calculates employee's overtime with Harvest's CSV reports.

## How to install

```bash
# Global so it can be call from anywhere
$ npm install -g harvest-overtime
```

## Usage

harvest-overtime [input-file] [output-file]

Where `input-file` and `output-file` are the files paths for the
input and output. If these file paths are not defined, it will
use the following:

- input: harvest.csv
- output: report.csv

## Examples

```bash
harvest-overtime harvest_time_report_from2018-08-06to2018-08-12.csv report.csv
```

Overtime report will be `report.csv`.
