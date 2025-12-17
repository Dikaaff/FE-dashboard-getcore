import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { UserSidebar } from "./components/UserSidebar";
import { UserTopBar } from "./components/UserTopBar";
import { AdminTopBar } from "./components/AdminTopBar";
import { DashboardContent } from "./components/DashboardContent";
import { WelcomeOverviewContent } from "./components/WelcomeOverviewContent";
import { MyTicketsUserContent } from "./components/MyTicketsUserContent";
import { ShopContent } from "./components/ShopContent";
import { CheckoutPage } from "./components/CheckoutPage";
import { PaymentProcessingPage } from "./components/PaymentProcessingPage";
import { PaymentSuccessPage } from "./components/PaymentSuccessPage";
import { CustomerManagementContent } from "./components/CustomerManagementContent";
import { TeamMembersContent } from "./components/TeamMembersContent";
import { BroadcastContent } from "./components/BroadcastContent";
import { AIAgentsContent } from "./components/AIAgentsContent";
import { AIAgentDetailContent } from "./components/AIAgentDetailContent";
import { ActivityLogContent } from "./components/ActivityLogContent";
import { ActivityLogUserContent } from "./components/ActivityLogUserContent";
import { AdminBillingContent } from "./components/AdminBillingContent";
import { BillingSubscriptionUserContent } from "./components/BillingSubscriptionUserContent";
import { UserProfileContent } from "./components/UserProfileContent";
import { AdminProfileContent } from "./components/AdminProfileContent";
import { UserSettingsContent } from "./components/UserSettingsContent";
import { AdminSettingsContent } from "./components/AdminSettingsContent";
import { GetcoreAssistantPage } from "./components/GetcoreAssistantPage";
import { PlanConfigContent } from "./components/PlanConfigContent";
import { TicketManagementContent } from "./components/TicketManagementContent";
import { TicketDetailContent } from "./components/TicketDetailContent";
import { CreateTicketDialog } from "./components/CreateTicketDialog";
import { KanbanBoardContent } from "./components/KanbanBoardContent";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { Toaster } from "./components/ui/sonner";
import { cn } from "./components/ui/utils";

type Page =
  | "dashboard"
  | "customers"
  | "team"
  | "tickets"
  | "ticket-kanban-board"
  | "broadcast"
  | "agents"
  | "activity"
  | "billing"
  | "profile"
  | "settings"
  | "assistant"
  | "plan-config"
  | "shop"
  | "checkout"
  | "payment-processing"
  | "payment-success";
type AuthView = "login" | "register";
type UserRole = "admin" | "user";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const [authView, setAuthView] = useState<AuthView>("login");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");
  const [selectedAgentId, setSelectedAgentId] = useState<
    string | null
  >(null);
  const [selectedTicketId, setSelectedTicketId] = useState<
    string | null
  >(null);
  const [showCreateTicket, setShowCreateTicket] =
    useState(false);
  const [selectedPlanId, setSelectedPlanId] =
    useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const handleLogin = (email?: string) => {
    // Detect role based on email
    if (email && email.includes("admin")) {
      setUserRole("admin");
    } else if (email && email.includes("user")) {
      setUserRole("user");
    }
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setUserRole("user"); // New registrations are users by default
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("admin");
    setCurrentPage("dashboard");
    setSelectedAgentId(null);
    setSelectedTicketId(null);
  };

  // If not authenticated, show login/register
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <>
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => setAuthView("register")}
          />
          <Toaster />
        </>
      );
    } else {
      return (
        <>
          <RegisterPage
            onRegister={handleRegister}
            onNavigateToLogin={() => setAuthView("login")}
          />
          <Toaster />
        </>
      );
    }
  }

  const handleNavigateToAgentDetail = (agentId: string) => {
    setSelectedAgentId(agentId);
  };

  const handleBackFromAgentDetail = () => {
    setSelectedAgentId(null);
  };

  const handleNavigateToTicketDetail = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  const handleBackFromTicketDetail = () => {
    setSelectedTicketId(null);
  };

  const handleOpenCreateTicket = () => {
    setShowCreateTicket(true);
  };

  const handleCloseCreateTicket = () => {
    setShowCreateTicket(false);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Reset agent detail when navigating away from agents page
    if (page !== "agents") {
      setSelectedAgentId(null);
    }
    // Reset ticket detail when navigating away from tickets or kanban board page
    if (page !== "tickets" && page !== "ticket-kanban-board") {
      setSelectedTicketId(null);
    }
  };

  const renderContent = () => {
    // Payment flow pages (same for both admin and user)
    if (currentPage === "checkout") {
      return (
        <CheckoutPage
          planId={selectedPlanId}
          onBack={() =>
            setCurrentPage(
              userRole === "user" ? "shop" : "plan-config",
            )
          }
          onProceed={(paymentMethod) => {
            setSelectedPaymentMethod(paymentMethod);
            setCurrentPage("payment-processing");
          }}
        />
      );
    }

    if (currentPage === "payment-processing") {
      return (
        <PaymentProcessingPage
          paymentMethod={selectedPaymentMethod}
          onBack={() => setCurrentPage("checkout")}
          onComplete={() => setCurrentPage("payment-success")}
        />
      );
    }

    if (currentPage === "payment-success") {
      return (
        <PaymentSuccessPage
          onNavigateToDashboard={() =>
            setCurrentPage("dashboard")
          }
          onNavigateToAgents={() => setCurrentPage("agents")}
        />
      );
    }

    // For user role, show different dashboard and limited pages
    if (userRole === "user") {
      switch (currentPage) {
        case "tickets":
          return selectedTicketId ? (
            <TicketDetailContent
              ticketId={selectedTicketId}
              onBack={handleBackFromTicketDetail}
            />
          ) : (
            <MyTicketsUserContent
              onViewTicket={handleNavigateToTicketDetail}
              onCreateTicket={handleOpenCreateTicket}
            />
          );
        case "shop":
          return (
            <ShopContent
              onCheckout={(planId) => {
                if (planId === "free") return; // Can't checkout free plan
                if (planId === "enterprise") {
                  // TODO: Show contact sales modal
                  return;
                }
                setSelectedPlanId(planId);
                setCurrentPage("checkout");
              }}
            />
          );
        case "plan-config":
          return <PlanConfigContent />;
        case "assistant":
          return <GetcoreAssistantPage />;
        case "activity":
          return <ActivityLogUserContent />;
        case "billing":
          return <BillingSubscriptionUserContent />;
        case "profile":
          return <UserProfileContent />;
        case "settings":
          return <UserSettingsContent />;
        case "dashboard":
        default:
          return (
            <WelcomeOverviewContent
              onNavigate={handleNavigate}
            />
          );
      }
    }

    // Admin dashboard - full access
    switch (currentPage) {
      case "customers":
        return <CustomerManagementContent />;
      case "team":
        return <TeamMembersContent />;
      case "broadcast":
        return <BroadcastContent />;
      case "agents":
        return selectedAgentId ? (
          <AIAgentDetailContent
            agentId={selectedAgentId}
            onBack={handleBackFromAgentDetail}
          />
        ) : (
          <AIAgentsContent
            onManageAgent={handleNavigateToAgentDetail}
          />
        );
      case "activity":
        return <ActivityLogContent />;
      case "billing":
        return <AdminBillingContent />;
      case "profile":
        return <AdminProfileContent />;
      case "settings":
        return <AdminSettingsContent />;
      case "assistant":
        return <GetcoreAssistantPage />;
      case "plan-config":
        return <PlanConfigContent />;
      case "tickets":
        return selectedTicketId ? (
          <TicketDetailContent
            ticketId={selectedTicketId}
            onBack={handleBackFromTicketDetail}
          />
        ) : (
          <TicketManagementContent
            onViewTicket={handleNavigateToTicketDetail}
            onCreateTicket={handleOpenCreateTicket}
          />
        );
      case "ticket-kanban-board":
        return selectedTicketId ? (
          <TicketDetailContent
            ticketId={selectedTicketId}
            onBack={handleBackFromTicketDetail}
          />
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-gray-900">Ticket Kanban Board</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Drag & drop tickets untuk mengubah status
                </p>
              </div>
            </div>
            <KanbanBoardContent onViewTicket={handleNavigateToTicketDetail} />
          </div>
        );
      case "dashboard":
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f7f7f7] overflow-hidden">
      {userRole === "admin" ? (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      ) : (
        <UserSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage as any}
          onNavigate={handleNavigate as any}
        />
      )}

      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20",
        )}
      >
        {userRole === "admin" ? (
          <AdminTopBar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        ) : (
          <UserTopBar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      <Toaster />
      <CreateTicketDialog
        isOpen={showCreateTicket}
        onClose={handleCloseCreateTicket}
      />
    </div>
  );
}