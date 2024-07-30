'use client';
import { useEffect, useState } from 'react';
import socket from '../lib/socket';
import { API_URL } from '@/services/job.service';

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [newJobId, setNewJobId] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on('jobStatusUpdate', (job: any) => {
      console.log('Received jobStatusUpdate', job);
      setJobs((prevJobs) => {
        const existingJobIndex = prevJobs.findIndex(j => j.jobId === job.jobId);
        if (existingJobIndex > -1) {
          const updatedJobs = [...prevJobs];
          updatedJobs[existingJobIndex] = job;
          return updatedJobs;
        }
        return [...prevJobs, job];
      });
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.off('jobStatusUpdate');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const createJob = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}`, { method: 'POST' });
    const { jobId } = await response.json();
    setNewJobId(jobId);
    setIsLoading(prev=> !prev);
  };


  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=food&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
      console.log("this is the response", response);
      const data = await response.json();
      console.log("this is the data", data);
      setLoadingImage(data.urls.small);
    } catch (error) {
      console.error('Error fetching random image for loader:', error);
    }
  };

  return (
    <div>
      <button onClick={createJob}>Create Job</button>
      {isLoading && loadingImage && <img src={loadingImage} alt="Loading" />}
      <ul>
        {jobs.map((job) => (
          <li key={job.jobId}>
            Job ID: {job.jobId}
            <br />
            {/* Status: {job.imageUrl ? <img src={job.imageUrl} alt="Food" /> : 'Pending'} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
