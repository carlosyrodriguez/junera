import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function JobCard({ job }) {
    return (
        <Link href={`/job-postings/${job.id || job.jobId}`} key={job.id || job.jobId}>
            <div className="flex items-center gap-4 py-4 bg-background mb-2">
                <Avatar>
                    <AvatarImage src={job.logo || "https://via.placeholder.com/150"} />
                    <AvatarFallback>{job.company?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <CardDescription>{job.company}</CardDescription>
                    <CardTitle>{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {job.location} 
                        {job.experienceLevel ? ` • ${job.experienceLevel}` : ""} 
                        {job.postedDate ? ` • ${job.postedDate}` : ""} 
                        {job.salary ? ` • ${job.salary}` : ""}
                    </p>
                </div>
            </div>
        </Link>
    );
}