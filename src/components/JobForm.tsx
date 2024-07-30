import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/services/job.service';

const JobForm = ({ jobId }: { jobId?: string }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
 
  const { replace } = useRouter();

  useEffect(() => {
    if (jobId) {
      setIsEdit(true);
      setLoading(true);
      axios.get(`${API_URL}/${jobId}`).then((response) => {
        const job = response.data;
        setTitle(job.title);
        setDescription(job.description);
        setLoading(false);
      });
    }
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { title, description };
    if (isEdit) {
      await axios.put(`${API_URL}/${jobId}`, payload);
    } else {
      await axios.post(API_URL, payload);
    }
    setLoading(false);
    replace('/');
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">{isEdit ? 'Edit Job' : 'Create Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border"
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : isEdit ? 'Update Job' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
