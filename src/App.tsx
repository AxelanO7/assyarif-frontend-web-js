import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not_found";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";

// income
import Income from "./pages/income/income";
import CreateIncome from "./pages/income/create";
import UpdateIncome from "./pages/income/update";
import DetailIncome from "./pages/income/detail";
import ReportIncome from "./pages/income/report";
import DetailReportIncome from "./pages/income/detail_report";

// outcome
import Outcome from "./pages/outcome/outcome";
import CreateOutcome from "./pages/outcome/create";
import UpdateOutcome from "./pages/outcome/update";
import DetailOutcome from "./pages/outcome/detail";
import ReportOutcome from "./pages/outcome/report";
import DetailReportOutcome from "./pages/outcome/detail_report";

// opname
import Opname from "./pages/opname/opname";
import DetailReportOpname from "./pages/opname/detail_report";

// employee
import Employee from "./pages/employee/employee";
import CreateEmployee from "./pages/employee/create";
import UpdateEmployee from "./pages/employee/update";
import Po from "./pages/outlet/po";
import DetailOrderOutlet from "./pages/outlet/detail_order";
import Return from "./pages/return/return";
import Proof from "./pages/return/proof";
import DetailReturn from "./pages/return/detail";
import Order from "./pages/order/order";
import CreateOrder from "./pages/order/create";
import OutcomeOutlet from "./pages/outlet/outcome";
import CreateOutcomeOutlet from "./pages/outlet/create";
import OutletProof from "./pages/outlet/proof";
import OutletProfile from "./pages/outlet/profile";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* income */}
          <Route path="/in" element={<Income />} />
          <Route path="/in/add" element={<CreateIncome />} />
          <Route path="/in/:id" element={<UpdateIncome />} />
          <Route path="/in/detail/:id" element={<DetailIncome />} />
          <Route path="/in/report" element={<ReportIncome />} />
          <Route path="/in/report/detail" element={<DetailReportIncome />} />
          {/* outcome */}
          <Route path="/out" element={<Outcome />} />
          <Route path="/out/add" element={<CreateOutcome />} />
          <Route path="/out/:id" element={<UpdateOutcome />} />
          <Route path="/out/detail/:id" element={<DetailOutcome />} />
          <Route path="/out/report" element={<ReportOutcome />} />
          <Route path="/out/report/detail" element={<DetailReportOutcome />} />
          {/* opname */}
          <Route path="/opname" element={<Opname />} />
          <Route
            path="/opname/report/detail"
            element={<DetailReportOpname />}
          />
          {/* employee */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/add" element={<CreateEmployee />} />
          <Route path="/employee/:id" element={<UpdateEmployee />} />
          {/* outlet */}
          <Route path="/outlet" element={<Po />} />
          <Route path="/outlet/detail-order" element={<DetailOrderOutlet />} />
          <Route path="/outlet/out" element={<OutcomeOutlet />} />
          <Route path="/outlet/out/add" element={<CreateOutcomeOutlet />} />
          <Route path="/outlet/return/proof" element={<OutletProof />} />
          <Route path="/outlet/profile" element={<OutletProfile />} />
          {/* return */}
          <Route path="/return" element={<Return />} />
          <Route path="/return/proof" element={<Proof />} />
          <Route path="/return/detail" element={<DetailReturn />} />
          {/* order */}
          <Route path="/order" element={<Order />} />
          <Route path="/order/add" element={<CreateOrder />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
