'use client'
import { useParams } from 'next/navigation';
import JobForm from '../../../components/JobForm';

const EditJobPage = () => {
  const { id } = useParams();

  return <JobForm jobId={id as string} />;
};

export default EditJobPage;