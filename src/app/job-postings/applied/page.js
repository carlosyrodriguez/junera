"use client";
import { JobCard } from "@/components/job-posting";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DataTableDemo } from "@/components/data-table";

export default function AppliedJobsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isFetching, setIsFetching] = useState(true); // Add fetching state

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else {
                async function fetchAppliedJobs() {
                    try {
                        const response = await fetch('/api/dashboard/applied-jobs', {
                            headers: {
                                'Authorization': `Bearer ${user.token}`,
                            },
                        });
                        const data = await response.json();
                        setAppliedJobs(data.userJobs);
                    } catch (error) {
                        console.error("Error fetching applied jobs:", error);
                    } finally {
                        setIsFetching(false); // Set fetching to false after data is fetched
                    }
                }
                fetchAppliedJobs();
            }
        }
    }, [user, loading, router]);

    if (loading || isFetching) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-gray-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        );
      }

    return (
        <div className="container mx-auto py-10 p-4 max-w-4xl">
        <Breadcrumb className="mb-4">
        <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/job-postings">Jobs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbPage>
        Applied
    </BreadcrumbPage>
  </BreadcrumbList>
</Breadcrumb>
            <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
            <div className="flex flex-col">
                <DataTableDemo data={appliedJobs} />
            </div>
        </div>
    );
}
