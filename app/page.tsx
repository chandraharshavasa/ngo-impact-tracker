import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BarChart3, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">NGO Impact Tracking System</h1>
          <p className="text-lg text-muted-foreground">
            Track and report the impact of your NGO's work across India
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Submit Monthly Report
              </CardTitle>
              <CardDescription>
                Record your NGO's monthly activities and impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Submit details about people helped, events conducted, and funds utilized for the month.
              </p>
              <Link href="/submit-report" className="block w-full">
                <Button className="w-full group">
                  Go to Report Form
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>
                View aggregated impact data across all NGOs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Access summary statistics and visualize the collective impact of all registered NGOs.
              </p>
              <Link href="/admin-dashboard" className="block w-full">
                <Button className="w-full group">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
