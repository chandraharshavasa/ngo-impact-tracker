import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Get month from query parameters
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get("month");
    
    if (!month || !month.match(/^\d{4}-\d{2}$/)) {
      return NextResponse.json(
        { message: "Invalid month format. Use YYYY-MM" }, 
        { status: 400 }
      );
    }
    
    // Filter reports by month
    const monthlyReports = db.reports.filter(report => report.month === month);
    
    // Calculate aggregated data
    const totalNgos = new Set(monthlyReports.map(report => report.ngoId)).size;
    const totalPeopleHelped = monthlyReports.reduce((sum, report) => sum + report.peopleHelped, 0);
    const totalEventsConducted = monthlyReports.reduce((sum, report) => sum + report.eventsConducted, 0);
    const totalFundsUtilized = monthlyReports.reduce((sum, report) => sum + report.fundsUtilized, 0);
    
    return NextResponse.json({
      totalNgos,
      totalPeopleHelped,
      totalEventsConducted,
      totalFundsUtilized,
    });
    
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}
