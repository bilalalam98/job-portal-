'use client';
import { useEffect, useState } from 'react';
import socket from '../lib/socket';
import { API_URL } from '@/services/job.service';

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobStatus, setJobStatus] = useState<string>('idle');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [jobId, setJobId] = useState<string>('');

  useEffect(() => {
    socket.on('jobStatusUpdate', (data) => {
      setJobStatus(data.status);

      console.log("yeh hai  data", data);
      if (data.status === 'pending') {
        console.log("yeh hai pending wali data", data);
        setImageUrl(data.data.imageUrl);
        setJobId(data.data.jobId);
      } else if (data.status === 'success') {
        setJobs((prevJobs) => {
          const existingJobIndex = prevJobs.findIndex(j => j.jobId === data.jobId);
          if (existingJobIndex > -1) {
            const updatedJobs = [...prevJobs];
            updatedJobs[existingJobIndex] = data;
            return updatedJobs;
          }
          return [...prevJobs, data];
        });
      }
    });

    return () => {
      socket.off('jobStatusUpdate');
    };
  }, []);

  const createJob = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'x-client-id': socket.id } as any,
    });
    const data = await response.json();
    setJobId(data.jobId);
  };

  return (
    <div>
      <button onClick={createJob} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
       Create Job
      </button>
      {jobStatus === 'pending' && (
        <>
        <p>Job Status: {jobStatus}</p>
        <img src={imageUrl} alt="Random food" />
        </>
      )}
      {jobStatus === 'success' && (
        <>
         <p>Job Status: {jobStatus}</p>
        <p>Newly created Job ID: {jobId}</p>
        <ul>
        {jobs.map((job) => (
          <li key={job.jobId}>
            Job ID: {job.jobId}
          </li>
        ))}
      </ul>
        </>
      )}
    </div>
  );
};

export default JobList;
