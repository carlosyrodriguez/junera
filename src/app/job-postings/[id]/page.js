import { getConnection } from "@/lib/db";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";

import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function CompanyHoverCard({ companyName, companyLogo, companyDescription, companyId }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="m-0 px-0">
        <Button variant="link">{companyName}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 mx-4">
        <Link href={`/companies/${companyId}`}>
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={companyLogo || "https://via.placeholder.com/150"} />
            <AvatarFallback>{companyName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{companyName}</h4>
            <p className="text-sm">
              {companyDescription}
            </p>
          </div>
        </div>
        </Link>
      </HoverCardContent>
    </HoverCard>
  )
}

async function getJobPostingById(id) {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id) // Use parameterized query to prevent SQL injection
    .query("SELECT jobPostings.*, companies.name AS companyName, companies.description AS companyDescription, companies.logo AS companyLogo FROM jobPostings JOIN companies ON jobPostings.company_id = companies.id WHERE jobPostings.id = @id");

  return result.recordset[0]; // Return the first (and only) result
}

export default async function JobPostingPage({ params }) {
  const { id } = params; // Extract id from the URL
  const jobPosting = await getJobPostingById(id);

  if (!jobPosting) {
    return <div>Job posting not found.</div>;
  }

  return (
    <div className="container mx-auto py-10 p-4">
      <CompanyHoverCard 
        companyName={jobPosting.companyName} 
        companyLogo={jobPosting.companyLogo} 
        companyDescription={jobPosting.companyDescription}
        companyId={jobPosting.company_id}
      />
      <h1 className="text-2xl font-bold mb-2">{jobPosting.title}</h1>
      <p className="text-sm font-semibold">{jobPosting.location}</p>
      <p className="text-xs text-muted-foreground">{new Date(jobPosting.postedDate).toLocaleDateString()}</p>
      <p>{jobPosting.salary ? `${jobPosting.salary}` : ""}</p>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Job Description</AccordionTrigger>
          <AccordionContent>
            {jobPosting.description}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Requirements</AccordionTrigger>
          <AccordionContent>
            {jobPosting.requirements}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Responsibilities</AccordionTrigger>
          <AccordionContent>
            {jobPosting.responsibilities}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Company Description</AccordionTrigger>
          <AccordionContent>
            {jobPosting.companyDescription}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Benefits</AccordionTrigger>
          <AccordionContent>
            {jobPosting.Benefits}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Minimum Requirements</AccordionTrigger>
          <AccordionContent>
            {jobPosting.MinimumQualifications}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
