import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchJobById } from "@/services/job.service";
import { Loader } from "./Loader";
const ViewJob = ({ jobId }: { jobId?: string }) => {
  const [jobData, setJobData] = useState({
    status: "",
    jobId: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const { replace } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (jobId) {
        setLoading(true);
        const job = await fetchJobById(jobId);
        setJobData(job);
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const onBackHandler = () => {
    replace("/");
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
          <div className="flex justify-center items-center h-64 bg-gray-200">
            {jobData.imageUrl ? (
              <img src={jobData.imageUrl} alt="Food" className="w-full h-full object-cover" />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Job ID: {jobData.jobId}</div>
            <p className="text-gray-700 text-base">Status: {jobData.status}</p>
          </div>
          <div className="px-6 py-4 flex justify-center">
            <button
              onClick={onBackHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJob;
