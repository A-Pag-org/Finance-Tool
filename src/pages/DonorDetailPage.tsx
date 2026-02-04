import { useParams } from "react-router-dom";

const DonorDetailPage = () => {
  const { donorId } = useParams();

  return (
    <section>
      <h1>Donor Detail</h1>
      <p>Donor ID: {donorId ?? "Unknown"}</p>
    </section>
  );
};

export default DonorDetailPage;
