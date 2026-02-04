import { donors } from "../data/mockData";

const DonorsPage = () => {
  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h1>Donors</h1>
          <p>Partners funding priority programs.</p>
        </div>
        <div className="page-meta">
          <span>{donors.length} donors</span>
        </div>
      </header>
      <div className="list-layout">
        <ul className="donor-list">
          {donors.map((donor) => (
            <li key={donor.id} className="donor-list-item">
              <div className="donor-list-primary">
                <h2>{donor.name}</h2>
                <p>{donor.type}</p>
              </div>
              <div className="donor-list-secondary">
                <span>
                  INR {donor.contributionAmount.toLocaleString("en-IN")}
                </span>
                <span>{donor.preferences.length} allocations</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DonorsPage;
