import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Your existing pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// 1. IMPORT YOUR NEW PAGES
import StudentLogin from "./pages/StudentLogin";
import ForgetPassword from "./pages/ForgetPassword";
import StudentSignup from "./pages/StudentSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {/* 2. ADD YOUR NEW ROUTES HERE */}
          <Route path="/" element={<Index />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/forget/password" element={<ForgetPassword />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* This one must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;