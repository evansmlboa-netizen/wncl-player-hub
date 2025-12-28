import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Fixtures from "@/pages/Fixtures";
import Formation from "@/pages/Formation";
import Stats from "@/pages/Stats";
import Availability from "@/pages/Availability";
import Training from "@/pages/Training";
import Feedback from "@/pages/Feedback";
import News from "@/pages/News";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/training" element={<Training />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/news" element={<News />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
