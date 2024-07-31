'use client'
import { useParams } from 'next/navigation';
import JobForm from '../../../components/ViewJob';

const EditJobPage = () => {
  const { id } = useParams();

  return <JobForm jobId={id as string} />;
};

export default EditJobPage;