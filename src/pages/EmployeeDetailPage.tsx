import { NavLink, useParams } from "react-router-dom";
import { donors, employees, programs } from "../data/mockData";
import { buildDonorAllocationMap } from "../utils/allocation";
import { formatCurrency, formatDate, formatPercent } from "../utils/format";

const EmployeeDetailPage = () => {
  const { employeeId } = useParams();

  const employee = employees.find((item) => item.id === employeeId);

  if (!employee) {
    return (
      <section className="page-section">
        <h1>Employee not found</h1>
        <p>
          Return to the <NavLink to="/employees">employees list</NavLink>.
        </p>
      </section>
    );
  }

  const program =
    programs.find((item) => item.id === employee.programId)?.name ??
    "Unassigned";
  const linkedDonors = donors.filter((donor) =>
    donor.preferences.some((preference) => preference.programId === employee.programId)
  );

  return (
    <section className="page-section">
      <header className="detail-header">
        <div className="detail-header-media">
          <img src={employee.photoUrl} alt={employee.name} />
        </div>
        <div className="detail-header-body">
          <p className="detail-eyebrow">Employee</p>
          <h1>{employee.name}</h1>
          <p className="detail-subtitle">{employee.role}</p>
        </div>
      </header>
      <div className="detail-grid">
        <section className="detail-card">
          <h2>Profile</h2>
          <div className="detail-row">
            <span>Role</span>
            <span>{employee.role}</span>
          </div>
          <div className="detail-row">
            <span>Location</span>
            <span>
              {employee.city}, {employee.geography}
            </span>
          </div>
          <div className="detail-row">
            <span>Program</span>
            <span>{program}</span>
          </div>
          <div className="detail-row">
            <span>Joined</span>
            <span>{formatDate(employee.joiningDate)}</span>
          </div>
        </section>
        <section className="detail-card">
          <h2>Metrics</h2>
          <div className="detail-row">
            <span>Monthly salary</span>
            <span>{formatCurrency(employee.monthlySalary)}</span>
          </div>
          <div className="detail-row">
            <span>PF contribution</span>
            <span>{formatCurrency(employee.pfContribution)}</span>
          </div>
          <div className="detail-row">
            <span>TDS deduction</span>
            <span>{formatCurrency(employee.tdsDeduction)}</span>
          </div>
          <div className="detail-row">
            <span>Annual salary</span>
            <span>
              {formatCurrency(employee.monthlySalary * 12)}
            </span>
          </div>
        </section>
        <section className="detail-card">
          <h2>Donor Allocation</h2>
          <p className="table-note">Salary allocation weighted by salary and tenure.</p>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Allocation %</th>
                </tr>
              </thead>
              <tbody>
                {linkedDonors.map((donor) => {
                  const allocationMap = buildDonorAllocationMap(donor, employees);
                  const allocationPercent = allocationMap.get(employee.id) ?? 0;

                  return (
                    <tr key={donor.id}>
                      <td>{donor.name}</td>
                      <td>{formatPercent(allocationPercent)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <section className="detail-card">
          <h2>Assignments</h2>
          <p>Program assignments and workload details will appear here.</p>
        </section>
      </div>
    </section>
  );
};

export default EmployeeDetailPage;
