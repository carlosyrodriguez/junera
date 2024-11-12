import { getConnection } from "@/lib/db"; // Use your Azure SQL connection helper
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search } from "lucide-react";
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ExperienceLevelSelect() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Experience Level</SelectLabel>
            <SelectItem value="internship">Internships</SelectItem>
            <SelectItem value="entry">Entry Level / Associate</SelectItem>
            <SelectItem value="mid">Mid Level</SelectItem>
            <SelectItem value="senior">Senior Level</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="director">Director</SelectItem>
            <SelectItem value="vp">Vice President</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  export function LocationSelect() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>State</SelectLabel>
            <SelectItem value="AL">Alabama</SelectItem>
            <SelectItem value="AK">Alaska</SelectItem>
            <SelectItem value="AZ">Arizona</SelectItem>
            <SelectItem value="AR">Arkansas</SelectItem>
            <SelectItem value="CA">California</SelectItem>
            <SelectItem value="CO">Colorado</SelectItem>
            <SelectItem value="CT">Connecticut</SelectItem>
            <SelectItem value="DE">Delaware</SelectItem>
            <SelectItem value="FL">Florida</SelectItem>
            <SelectItem value="GA">Georgia</SelectItem>
            <SelectItem value="HI">Hawaii</SelectItem>
            <SelectItem value="ID">Idaho</SelectItem>
            <SelectItem value="IL">Illinois</SelectItem>
            <SelectItem value="IN">Indiana</SelectItem>
            <SelectItem value="IA">Iowa</SelectItem>
            <SelectItem value="KS">Kansas</SelectItem>
            <SelectItem value="KY">Kentucky</SelectItem>
            <SelectItem value="LA">Louisiana</SelectItem>
            <SelectItem value="ME">Maine</SelectItem>
            <SelectItem value="MD">Maryland</SelectItem>
            <SelectItem value="MA">Massachusetts</SelectItem>
            <SelectItem value="MI">Michigan</SelectItem>
            <SelectItem value="MN">Minnesota</SelectItem>
            <SelectItem value="MS">Mississippi</SelectItem>
            <SelectItem value="MO">Missouri</SelectItem>
            <SelectItem value="MT">Montana</SelectItem>
            <SelectItem value="NE">Nebraska</SelectItem>
            <SelectItem value="NV">Nevada</SelectItem>
            <SelectItem value="NH">New Hampshire</SelectItem>
            <SelectItem value="NJ">New Jersey</SelectItem>
            <SelectItem value="NM">New Mexico</SelectItem>
            <SelectItem value="NY">New York</SelectItem>
            <SelectItem value="NC">North Carolina</SelectItem>
            <SelectItem value="ND">North Dakota</SelectItem>
            <SelectItem value="OH">Ohio</SelectItem>
            <SelectItem value="OK">Oklahoma</SelectItem>
            <SelectItem value="OR">Oregon</SelectItem>
            <SelectItem value="PA">Pennsylvania</SelectItem>
            <SelectItem value="RI">Rhode Island</SelectItem>
            <SelectItem value="SC">South Carolina</SelectItem>
            <SelectItem value="SD">South Dakota</SelectItem>
            <SelectItem value="TN">Tennessee</SelectItem>
            <SelectItem value="TX">Texas</SelectItem>
            <SelectItem value="UT">Utah</SelectItem>
            <SelectItem value="VT">Vermont</SelectItem>
            <SelectItem value="VA">Virginia</SelectItem>
            <SelectItem value="WA">Washington</SelectItem>
            <SelectItem value="WV">West Virginia</SelectItem>
            <SelectItem value="WI">Wisconsin</SelectItem>
            <SelectItem value="WY">Wyoming</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

export function Input26() {
  return (
    <div className="space-y-2 mb-4">
      <Label htmlFor="input-26">Search input with icon and button</Label>
      <div className="relative">
        <Input id="input-26" className="peer pe-9 ps-9" placeholder="Search..." type="search" />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function Input31() {
  return (
    <div className="group relative">
      <label
        htmlFor="input-31"
        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        Input with overlapping label
      </label>
      <Input id="input-31" className="h-10" placeholder="Email" type="email" />
    </div>
  );
}


async function getJobPostings() {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        jp.id, 
        jp.title, 
        jp.location, 
        jp.postedDate, 
        c.name AS companyName,
        c.logo AS companyLogo
      FROM jobPostings jp
      INNER JOIN companies c ON jp.company_id = c.id
      ORDER BY jp.postedDate DESC
      OFFSET 0 ROWS FETCH NEXT 20 ROWS ONLY;
    `);
    
    return result.recordset.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.companyName,
      location: job.location,
      logo: job.companyLogo,
      datePosted: new Date(job.postedDate).toLocaleDateString(),
    }));
  }

export default async function JobPostingsPage() {
  const data = await getJobPostings();

return (
    <div className="container mx-auto py-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Job Postings</h1>
        <Input26 />
        <div className="flex space-x-4 overflow-x-auto">
            <ExperienceLevelSelect />
            <LocationSelect />
        </div>
        <div className="mt-4">
            {data.map((job) => (
                <Link href={`/job-postings/${job.id}`} key={job.id}>
                    <div className="flex items-center gap-4 p-4 bg-background mb-4 shadow rounded-md">
                        <img src={job.logo} alt={job.company} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                            <CardDescription>{job.company}</CardDescription>
                            <CardTitle>{job.title}</CardTitle>
                            <p className="text-sm text-gray-500">{job.location}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);
}