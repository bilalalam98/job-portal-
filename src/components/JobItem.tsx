import React from "react";
import { useRouter } from "next/navigation";
import { Loader } from "./Loader";

interface Job {
  jobId: string;
  status: string;
  imageUrl: string;
}

interface JobItemProps {
  job: Job;
  loading: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ job, loading }: JobItemProps) => {
  const { replace } = useRouter();
  return (
    <div className={`flex flex-wrap ${job.status == 'idle' && 'hidden'} justify-center items-center space-x-4 space-y-4`}>
        <div className="text-center">
          <div
            key={job.jobId}
            className="w-full max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 m-2"
          >
            <div className="h-64 bg-gray-200 flex justify-center items-center">
              {job.imageUrl ? (
                <img
                  src={job.imageUrl}
                  alt="Food"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p>No Image Available</p>
              )}
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{job.status === 'pending' ? 'Creating Job ID:' : 'Newly created Job ID:'}  {job.jobId}</div>
              <p className="text-gray-700 text-base">Status: {job.status}</p>
            </div>
            {loading && <Loader />}
            <div className="px-6 py-4 flex justify-center">
              <button
                onClick={() => replace(`/view-job/${job.jobId}`)}
                disabled={loading}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  loading && "!bg-gray-500 hover:!bg-gray-700"
                }`}
              >
                View
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default JobItem;
