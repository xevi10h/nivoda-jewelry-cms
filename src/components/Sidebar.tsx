import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navigation = [{ name: 'Inventory', href: '/', icon: Package }];

export const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { session, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
			<div className="p-6 border-b border-sidebar-border">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 flex items-center justify-center">
						<img
							src="/logo-isotope.png"
							alt="Nivoda"
							className="w-10 h-6 brightness-0 invert"
						/>
					</div>
					<div>
						<h1 className="text-base font-semibold text-sidebar-foreground">
							Jewelry CMS
						</h1>
						<p className="text-xs text-sidebar-foreground/60">
							Manufacturer Portal
						</p>
					</div>
				</div>
			</div>

			<nav className="flex-1 p-4 space-y-1">
				{navigation.map((item) => {
					const isActive = location.pathname === item.href;
					return (
						<Link
							key={item.name}
							to={item.href}
							className={cn(
								'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-smooth text-sm',
								isActive
									? 'bg-white text-black font-medium'
									: 'text-sidebar-foreground hover:bg-sidebar-accent',
							)}
						>
							<item.icon className="w-4 h-4" />
							<span>{item.name}</span>
						</Link>
					);
				})}
			</nav>

			<div className="p-4 space-y-3 border-t border-sidebar-border">
				{session?.user && (
					<>
						<div className="px-3 py-3 rounded-lg bg-sidebar-accent">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
									<User className="w-4 h-4 text-white" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-sidebar-foreground truncate">
										{session.user.firstName} {session.user.lastName}
									</p>
									<p className="text-xs text-sidebar-foreground/60 truncate">
										{session.user.email}
									</p>
								</div>
							</div>
						</div>
						<Separator className="bg-sidebar-border" />
					</>
				)}
				<Button
					variant="ghost"
					className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
					onClick={handleLogout}
				>
					<LogOut className="w-4 h-4 mr-3" />
					<span className="text-sm">Logout</span>
				</Button>
			</div>
		</aside>
	);
};
