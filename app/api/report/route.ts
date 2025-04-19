import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// Validation schema
const reportSchema = z.object({
  ngoId: z.string().min(1, "NGO ID is required"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
  peopleHelped: z.number().int().positive("Must be a positive number"),
  eventsConducted: z.number().int().positive("Must be a positive number"),
  fundsUtilized: z.number().positive("Must be a positive number"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request data
    const validationResult = reportSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: "Validation error", 
          errors: validationResult.error.errors 
        }, 
        { status: 400 }
      );
    }
    
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = validationResult.data;
    
    // Check if a report already exists for this NGO and month
    const existingReport = db.reports.find(
      report => report.ngoId === ngoId && report.month === month
    );
    
    if (existingReport) {
      // Update existing report
      Object.assign(existingReport, {
        peopleHelped,
        eventsConducted,
        fundsUtilized,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Create new report
      db.reports.push({
        id: crypto.randomUUID(),
        ngoId,
        month,
        peopleHelped,
        eventsConducted,
        fundsUtilized,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    return NextResponse.json({ 
      message: "Report submitted successfully" 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json(
      { message: "Internal server error" }, 
      { status: 500 }
    );
  }
}
