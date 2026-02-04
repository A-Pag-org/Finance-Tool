import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import DashboardPage from "./pages/DashboardPage";
import DonorDetailPage from "./pages/DonorDetailPage";
import DonorsPage from "./pages/DonorsPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import EmployeesPage from "./pages/EmployeesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import ProgramsPage from "./pages/ProgramsPage";
import SimulationPage from "./pages/SimulationPage";

const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetailPage />} />
        <Route path="/donors" element={<DonorsPage />} />
        <Route path="/donors/:donorId" element={<DonorDetailPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:programId" element={<ProgramDetailPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
};

export default App;
