import { useParams } from "react-router-dom";

const ProgramDetailPage = () => {
  const { programId } = useParams();

  return (
    <section>
      <h1>Program Detail</h1>
      <p>Program ID: {programId ?? "Unknown"}</p>
    </section>
  );
};

export default ProgramDetailPage;
