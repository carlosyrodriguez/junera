import { getConnection } from "@/lib/db";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Link from "next/link";

  
async function getCompanyById(id) {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", id) // Use parameterized query to prevent SQL injection
    .query("SELECT * FROM companies WHERE id = @id");

  return result.recordset[0]; // Return the first (and only) result
}

export default async function CompanyPage({ params }) {
  const { id } = params; // Extract id from the URL
  const company = await getCompanyById(id);

    if (!company) {
        return <div>Company not found.</div>;
    }

return (
    <div className="container mx-auto py-10 p-4">
        <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
        <p className="text-sm font-semibold">{company.location}</p>
        <p>{company.website ? `${company.website}` : ""}</p>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger>Company Description</AccordionTrigger>
                <AccordionContent>
                    {company.description}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                    {company.location}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Website</AccordionTrigger>
                <AccordionContent>
                    {company.link}
                </AccordionContent>
            </AccordionItem>
            {company.industry && (
    <AccordionItem value="item-4">
    <AccordionTrigger>Industry</AccordionTrigger>
    <AccordionContent>
        {company.industry}
    </AccordionContent>
    </AccordionItem>
)}
{(company.founded || company.size || company.stock_symbol) && (
    <AccordionItem value="item-5">
    <AccordionTrigger>Founded, Size & Stock Symbol</AccordionTrigger>
    <AccordionContent>
        {company.founded && <p>Founded: {company.founded}</p>}
        {company.size && <p>Size: {company.size}</p>}
        {company.stock_symbol && <p>Stock Symbol: {company.stock_symbol}</p>}
    </AccordionContent>
    </AccordionItem>
)}
{company.company_issues && (
    <AccordionItem value="item-6">
    <AccordionTrigger>Company Issues</AccordionTrigger>
    <AccordionContent>
        {company.company_issues}
    </AccordionContent>
    </AccordionItem>
)}
{company.company_engineer_choice && (
    <AccordionItem value="item-7">
    <AccordionTrigger>Engineer Choice</AccordionTrigger>
    <AccordionContent>
        {company.company_engineer_choice}
    </AccordionContent>
    </AccordionItem>
)}
{company.company_sentiment && (
    <AccordionItem value="item-8">
    <AccordionTrigger>Company Sentiment</AccordionTrigger>
    <AccordionContent>
        {company.company_sentiment}
    </AccordionContent>
    </AccordionItem>
)}
{company.company_recent_news_sentiment && (
    <AccordionItem value="item-9">
    <AccordionTrigger>Recent News Sentiment</AccordionTrigger>
    <AccordionContent>
        {company.company_recent_news_sentiment}
    </AccordionContent>
    </AccordionItem>
)}
{company.company_stage && (
    <AccordionItem value="item-10">
    <AccordionTrigger>Company Stage</AccordionTrigger>
    <AccordionContent>
        {company.company_stage}
    </AccordionContent>
    </AccordionItem>
)}
{company.twitter_username && (
    <AccordionItem value="item-11">
    <AccordionTrigger>Twitter Username</AccordionTrigger>
    <AccordionContent>
        {company.twitter_username}
    </AccordionContent>
    </AccordionItem>
)}
{company.company_website && (
    <AccordionItem value="item-12">
    <AccordionTrigger>Company Website</AccordionTrigger>
    <AccordionContent>
        {company.company_website}
    </AccordionContent>
    </AccordionItem>
)}
{company.job_board_url && (
    <AccordionItem value="item-13">
    <AccordionTrigger>Job Board URL</AccordionTrigger>
    <AccordionContent>
        {company.job_board_url}
    </AccordionContent>
    </AccordionItem>
)}
        </Accordion>
    </div>
  );
}