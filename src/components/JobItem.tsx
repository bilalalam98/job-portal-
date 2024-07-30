import React from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
  result: string | null;
}

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  return (
    <li className="mb-2 p-2 border rounded">
      <div>ID: {job.id}</div>
      <div>Title: {job.title}</div>
      <div>Description: {job.description}</div>
      <div>Status: {job.status}</div>
      <div>
        Result:{' '}
        {job.result ? (
          <Link href={job.result} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Image
          </Link>
        ) : (
          'Pending'
        )}
      </div>
      <div>
        <Link href={`/edit-job/${job.id}`}>
          <button className="bg-green-500 text-white py-1 px-2 rounded mr-2">
            Edit
          </button>
        </Link>
        <Link href={`/edit-job/${job.id}`}>
          <button className="bg-gray-500 text-white py-1 px-2 rounded">
            View
          </button>
        </Link>
      </div>
    </li>
  );
};

export default JobItem;
