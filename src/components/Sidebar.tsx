import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Gem, Package, Settings, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navigation = [
	{ name: 'Inventory', href: '/', icon: Package },
	{ name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { session, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<aside className="fixed left-0 top-0 h-screen w-128 bg-sidebar border-r border-sidebar-border flex flex-col">
			<div className="p-6 border-b border-sidebar-border">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
						<Gem className="w-6 h-6 text-primary-foreground" />
					</div>
					<div>
						<h1 className="text-lg font-bold text-sidebar-foreground">
							Nivoda Jewelry CMS
						</h1>
						<p className="text-xs text-muted-foreground">Manufacturer Admin</p>
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
								'flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth',
								isActive
									? 'bg-sidebar-accent text-primary font-medium'
									: 'text-sidebar-foreground hover:bg-sidebar-accent/50',
							)}
						>
							<item.icon className="w-5 h-5" />
							<span>{item.name}</span>
						</Link>
					);
				})}
			</nav>

			<div className="p-4 space-y-3 border-t border-sidebar-border">
				{session?.user && (
					<>
						<div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
									<User className="w-4 h-4 text-primary-foreground" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-sidebar-foreground truncate">
										{session.user.firstName} {session.user.lastName}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										{session.user.email}
									</p>
								</div>
							</div>
						</div>
						<Separator />
					</>
				)}
				<Button
					variant="ghost"
					className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
					onClick={handleLogout}
				>
					<LogOut className="w-5 h-5 mr-3" />
					<span>Logout</span>
				</Button>
			</div>
		</aside>
	);
};
