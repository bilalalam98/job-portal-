"use client";
import socket from "@/lib/socket";
import { API_URL } from "@/services/job.service";
import { useEffect, useState } from "react";
import JobItem from "./JobItem";
import Table from "./Table";

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobStatus, setJobStatus] = useState<string>("idle");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(prev=>!prev);
      const response = await fetch(API_URL);
      const data = await response.json();
      setJobs(data);
      setLoading(prev=>!prev);
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    socket.on("jobStatusUpdate", (data: any) => {
      if (data.status === "pending") {
        setJobId(data.data.jobId);
        setImageUrl(data.data.imageUrl);
        setJobStatus("pending");
      } else if (data.status === "resolved") {
        setJobStatus("resolved");
        setImageUrl(data.data.imageUrl);
        setJobs((prevJobs) => {
          const existingJobIndex = prevJobs.findIndex(
            (job) => job.jobId === data.data.jobId
          );
          if (existingJobIndex > -1) {
            const updatedJobs = [...prevJobs];
            updatedJobs[existingJobIndex] = data.data;
            return updatedJobs;
          }
          return [...prevJobs, data.data];
        });
      }
    });

    return () => {
      socket.off("jobStatusUpdate");
    };
  }, []);

  const createJob = async () => {
    setLoading(prev=>!prev);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "x-client-id": socket.id } as any,
    });
    const data = await response.json();
    setJobId(data.jobId);
    setLoading(prev=>!prev);
  };
  const currentJob = {jobId,status: jobStatus,imageUrl}

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
       <JobItem job={currentJob} loading={loading}/>
      <div className="mb-4 flex justify-center">
        <button
          onClick={createJob}
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading && '!bg-gray-500 hover:!bg-gray-700'}`}
        >
          Create Job
        </button>
      </div>
      <Table jobs={jobs} loading={loading}/>
    </div>
  );
};

export default JobList;
