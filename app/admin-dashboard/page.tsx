"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Users, Calendar, DollarSign, Building } from 'lucide-react';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  totalNgos: number;
  totalPeopleHelped: number;
  totalEventsConducted: number;
  totalFundsUtilized: number;
}

export default function AdminDashboardPage() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async (selectedMonth: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/dashboard?month=${selectedMonth}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      
      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(month);
  }, [month]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              View aggregated impact data across all NGOs
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              type="month"
              value={month}
              onChange={handleMonthChange}
              className="w-40"
            />
            <Button 
              onClick={() => fetchDashboardData(month)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="NGOs Reporting"
            value={data?.totalNgos}
            icon={<Building className="h-5 w-5" />}
            isLoading={isLoading}
            formatter={(val) => val.toLocaleString()}
            color="bg-blue-50"
            iconColor="text-blue-500"
          />
          
          <StatCard
            title="People Helped"
            value={data?.totalPeopleHelped}
            icon={<Users className="h-5 w-5" />}
            isLoading={isLoading}
            formatter={(val) => val.toLocaleString()}
            color="bg-green-50"
            iconColor="text-green-500"
          />
          
          <StatCard
            title="Events Conducted"
            value={data?.totalEventsConducted}
            icon={<Calendar className="h-5 w-5" />}
            isLoading={isLoading}
            formatter={(val) => val.toLocaleString()}
            color="bg-purple-50"
            iconColor="text-purple-500"
          />
          
          <StatCard
            title="Funds Utilized"
            value={data?.totalFundsUtilized}
            icon={<DollarSign className="h-5 w-5" />}
            isLoading={isLoading}
            formatter={(val) => formatCurrency(val)}
            color="bg-amber-50"
            iconColor="text-amber-500"
          />
        </div>

        {!isLoading && data && data.totalNgos === 0 && (
          <div className="mt-8 text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground mb-2">No data available for {month}</p>
            <Link href="/submit-report">
              <Button variant="outline">Submit a Report</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | undefined;
  icon: React.ReactNode;
  isLoading: boolean;
  formatter: (value: number) => string;
  color: string;
  iconColor: string;
}

function StatCard({ title, value, icon, isLoading, formatter, color, iconColor }: StatCardProps) {
  return (
    <Card>
      <CardHeader className={`pb-2 ${color}`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`p-2 rounded-full ${color} ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">
            {value !== undefined ? formatter(value) : "N/A"}
          </div>
        )}
        <CardDescription className="text-xs mt-1">
          Total for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
