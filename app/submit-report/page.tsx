"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  ngoId: z.string().min(1, "NGO ID is required"),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
  peopleHelped: z.coerce.number().int().positive("Must be a positive number"),
  eventsConducted: z.coerce.number().int().positive("Must be a positive number"),
  fundsUtilized: z.coerce.number().positive("Must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitReportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ngoId: "",
      month: new Date().toISOString().slice(0, 7), // Default to current month YYYY-MM
      peopleHelped: undefined,
      eventsConducted: undefined,
      fundsUtilized: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit report");
      }

      setSubmitStatus("success");
      form.reset();
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/admin-dashboard");
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Submit Monthly Report</CardTitle>
            <CardDescription>
              Record your NGO's impact for the month
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitStatus === "success" && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your report has been submitted successfully. Redirecting to dashboard...
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert className="mb-6 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ngoId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NGO ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your NGO ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your unique organization identifier
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reporting Month</FormLabel>
                      <FormControl>
                        <Input type="month" {...field} />
                      </FormControl>
                      <FormDescription>
                        The month for which you're reporting (YYYY-MM)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="peopleHelped"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>People Helped</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventsConducted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Events Conducted</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundsUtilized"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funds Utilized (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0.01" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
