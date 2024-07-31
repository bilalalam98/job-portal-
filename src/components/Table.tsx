import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Job {
  jobId: string;
  status: string;
  imageUrl: string;
}

interface JobItemProps {
  jobs: Job[];
  loading: boolean;
}

const Table = ({ jobs, loading }: JobItemProps) => {
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5); // Set the number of jobs per page
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortConfig !== null) {
               // @ts-ignore
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }       // @ts-ignore
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const pageButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Number of buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2));

    if (endPage - startPage + 1 < maxButtons) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxButtons - 1);
      } else {
        startPage = Math.max(1, endPage - maxButtons + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="relative  shadow-md sm:rounded-lg max-h-[520px]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("jobId")}>
              Job Id
              {sortConfig?.key === "jobId" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort("status")}>
              Job Status
              {sortConfig?.key === "status" && (sortConfig.direction === "ascending" ? " ▲" : " ▼")}
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job.jobId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img className="w-14 h-14 rounded-full" src={job.imageUrl} alt={job.jobId} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {job.jobId}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {job.status === "resolved" ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" />
                  )}
                  {job.status}
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => replace(`/view-job/${job.jobId}`)}
                  disabled={loading}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    loading && "!bg-gray-500 hover:!bg-gray-700"
                  }`}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(1)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            First
          </button>
        )}
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            Previous
          </button>
        )}
        {pageButtons()}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className=" px-3 py-1 border rounded bg-white text-blue-500"
          >
            Next
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(totalPages)}
            className="mx-1 px-3 py-1 border rounded bg-white text-blue-500"
          >
            Last
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
