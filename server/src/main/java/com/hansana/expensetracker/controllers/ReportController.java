package com.hansana.expensetracker.controllers;

import com.hansana.expensetracker.dtos.responses.MonthlyReportResponse;
import com.hansana.expensetracker.services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;

@RestController
@RequestMapping(path = "/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping(path = "/monthly")
    public ResponseEntity<MonthlyReportResponse> getMonthlyReports(@RequestParam YearMonth month) {
        return ResponseEntity.status(HttpStatus.OK).body(reportService.getMonthlyReport(month));
    }
}
