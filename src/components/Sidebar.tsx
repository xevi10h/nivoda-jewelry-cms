import { useState } from 'react';
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
	const [isExpanded, setIsExpanded] = useState(false);

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleProfileClick = () => {
		navigate('/profile');
	};

	return (
		<aside
			className={cn(
				'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out z-50',
				isExpanded ? 'w-64' : 'w-20',
			)}
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
		>
			{/* Header */}
			<div className="p-6 border-b border-sidebar-border">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
						<img
							src="/logo-isotope.png"
							alt="Nivoda"
							className="w-10 brightness-0 invert"
						/>
					</div>
					<div
						className={cn(
							'transition-all duration-300 overflow-hidden',
							isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
						)}
					>
						<h1 className="text-base font-semibold text-sidebar-foreground whitespace-nowrap">
							Jewelry CMS
						</h1>
						<p className="text-xs text-sidebar-foreground/60 whitespace-nowrap">
							Manufacturer Portal
						</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4 space-y-1">
				{navigation.map((item) => {
					const isActive = location.pathname === item.href;
					return (
						<Link
							key={item.name}
							to={item.href}
							className={cn(
								'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 text-sm',
								isActive
									? 'bg-white text-black font-medium'
									: 'text-sidebar-foreground hover:bg-sidebar-accent',
								!isExpanded && 'justify-center',
							)}
						>
							<item.icon className="w-4 h-4 flex-shrink-0" />
							<span
								className={cn(
									'transition-all duration-300 overflow-hidden whitespace-nowrap',
									isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
								)}
							>
								{item.name}
							</span>
						</Link>
					);
				})}
			</nav>

			{/* User Profile & Logout */}
			<div className="p-4 space-y-3 border-t border-sidebar-border">
				{session?.user && (
					<>
						<button
							onClick={handleProfileClick}
							className={cn(
								'w-full px-3 py-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-all duration-300 cursor-pointer',
								!isExpanded && 'px-0 flex justify-center',
							)}
						>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
									<User className="w-4 h-4 text-white" />
								</div>
								<div
									className={cn(
										'flex-1 min-w-0 text-left transition-all duration-300 overflow-hidden',
										isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
									)}
								>
									<p className="text-sm font-medium text-sidebar-foreground truncate">
										{session.user.firstName} {session.user.lastName}
									</p>
									<p className="text-xs text-sidebar-foreground/60 truncate">
										{session.user.email}
									</p>
								</div>
							</div>
						</button>
						<Separator className="bg-sidebar-border" />
					</>
				)}
				<Button
					variant="ghost"
					className={cn(
						'w-full text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-300',
						isExpanded ? 'justify-start' : 'justify-center px-2',
					)}
					onClick={handleLogout}
				>
					<LogOut className="w-4 h-4 flex-shrink-0" />
					<span
						className={cn(
							'text-sm transition-all duration-300 overflow-hidden whitespace-nowrap',
							isExpanded ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0 ml-0',
						)}
					>
						Logout
					</span>
				</Button>
			</div>
		</aside>
	);
};
