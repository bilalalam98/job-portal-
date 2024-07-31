'use client'
import { useParams } from 'next/navigation';
import ViewJob from '../../../components/ViewJob';

const EditJobPage = () => {
  const { id } = useParams();

  return(
  <main className="flex min-h-screen flex-col">
    <ViewJob jobId={id as string} />
    </main>
  ) 
};

export default EditJobPage;