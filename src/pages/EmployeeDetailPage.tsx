import { useParams } from "react-router-dom";

const EmployeeDetailPage = () => {
  const { employeeId } = useParams();

  return (
    <section>
      <h1>Employee Detail</h1>
      <p>Employee ID: {employeeId ?? "Unknown"}</p>
    </section>
  );
};

export default EmployeeDetailPage;
