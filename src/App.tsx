import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Login from './pages/Login';
import IndexNew from './pages/IndexNew';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<AuthProvider>
				<SidebarProvider>
					<Toaster />
					<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<IndexNew />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
				</SidebarProvider>
			</AuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
