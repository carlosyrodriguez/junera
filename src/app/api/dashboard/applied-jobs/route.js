import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getConnection } from '@/lib/db';
import sql from 'mssql';

export async function GET(request) {
  // Extract token from Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  
  try {
    console.log('JWT_SECRET:', process.env.SESSION_SECRET); // Debugging line
    const decoded = jwt.verify(token, process.env.SESSION_SECRET || 'your-secret-key');
    const userId = decoded.id; // Adjust based on token payload structure
    console.log('Decoded userId:', decoded); // Debugging line

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }

    // Connect to the database
    const pool = await getConnection();

    // Query for user jobs from dbo.user_jobs
    const userJobsResult = await pool.request()
      .input('userId', sql.NVarChar, userId)
      .query(`
        SELECT 
          aj.id AS appliedJobId,
          aj.applied_at AS appliedAt,
          jp.id AS jobId,
          jp.title as jobTitle, 
          jp.location, 
          jp.postedDate, 
          jp.experienceLevel,
          jp.salary,
          c.name AS companyName,
          c.logo AS companyLogo
        FROM user_jobs aj
        INNER JOIN jobPostings jp ON aj.job_id = jp.id
        INNER JOIN companies c ON jp.company_id = c.id
        WHERE aj.user_id = @userId
        ORDER BY aj.applied_at DESC;
      `);

    const formattedUserJobs = userJobsResult.recordset.map(job => ({
      id: job.jobId,
      userId: job.userId,
      favId: job.id,
      postedDate: job.appliedAt,
      status: job.status,
      location: job.location,
      salary: job.salary,
      experienceLevel: job.experienceLevel,
      jobStatus: job.jobStatus,
      title: job.jobTitle,
      company: job.companyName,
      isCoreJob: job.isCoreJob,
    }));

    return NextResponse.json({ userJobs: formattedUserJobs }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
