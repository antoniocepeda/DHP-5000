import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ExpertDashboard from './components/dashboard/ExpertDashboard';
import ConsumerDashboard from './components/dashboard/ConsumerDashboard';
import ProviderDashboard from './components/dashboard/ProviderDashboard';
import QuestionsPage from './components/pages/QuestionsPage';
import ExpertsPage from './components/experts/ExpertsPage';
import ExpertProfile from './components/experts/ExpertProfile';
import QuestionDetail from './components/pages/QuestionDetail';
import QuestionForm from './components/questions/QuestionForm';
import LandingPage from './components/pages/LandingPage';
import VerifiedExpertsPage from './components/features/VerifiedExpertsPage';
import QuickResponsesPage from './components/features/QuickResponsesPage';
import DiversePerspectivesPage from './components/features/DiversePerspectivesPage';
import RecruitmentPage from './components/pages/RecruitmentPage';
import ApplicationPage from './components/pages/ApplicationPage';
import AssignedQuestionsPage from './components/pages/AssignedQuestionsPage';
import DashboardRouter from './components/routing/DashboardRouter';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features/verified-experts" element={<VerifiedExpertsPage />} />
      <Route path="/features/quick-responses" element={<QuickResponsesPage />} />
      <Route path="/features/diverse-perspectives" element={<DiversePerspectivesPage />} />
      <Route path="/recruitment" element={<RecruitmentPage />} />
      <Route path="/apply" element={<ApplicationPage />} />
      <Route path="/ask" element={<QuestionForm />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <DashboardRouter />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/experts" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ExpertsPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/questions" element={
        <ProtectedRoute>
          <DashboardLayout>
            <QuestionsPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/questions/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <QuestionDetail />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/experts/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ExpertProfile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;