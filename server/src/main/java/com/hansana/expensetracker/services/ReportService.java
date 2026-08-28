package com.hansana.expensetracker.services;

import com.hansana.expensetracker.dtos.responses.MonthlyReportResponse;

import java.time.YearMonth;

public interface ReportService {
    MonthlyReportResponse getMonthlyReport(YearMonth month);
}
