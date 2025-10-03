import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Separator } from '@/components/ui/separator';

const navigation = [{ name: 'Inventory', href: '/', icon: Package }];

export const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { session, logout } = useAuth();
	const { isExpanded, setIsExpanded } = useSidebar();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleProfileClick = () => {
		navigate('/profile');
	};

	const handleMouseEnter = () => {
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	return (
		<aside
			className={cn(
				'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
				isExpanded ? 'w-64' : 'w-20',
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Header */}
			<div className="p-6 border-b border-sidebar-border">
				<div className="flex items-center gap-4">
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
								'flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 text-sm',
								isActive
									? 'bg-white text-black font-medium'
									: 'text-sidebar-foreground hover:bg-sidebar-accent',
								isExpanded && 'gap-3',
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
								'w-full px-3 py-3 rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 cursor-pointer',
								isExpanded && 'gap-3',
							)}
						>
							<div className={cn(`flex items-center`, isExpanded && 'gap-3')}>
								<div
									className={cn(
										`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0`,
									)}
								>
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
				<button
					className={cn(
						'w-full px-3 py-3 rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 cursor-pointer',
						isExpanded && 'gap-3',
					)}
					onClick={handleLogout}
				>
					<div className={cn(`flex items-center`, isExpanded && 'gap-3')}>
						<div
							className={cn(
								`w-8 h-8 flex items-center justify-center flex-shrink-0`,
							)}
						>
							<LogOut className="w-4 h-4 text-white" />
						</div>
						<span
							className={cn(
								'flex-1 min-w-0 text-left transition-all duration-300 overflow-hidden',
								isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
							)}
						>
							<p className="text-sm font-medium text-sidebar-foreground truncate">
								Logout
							</p>
						</span>
					</div>
				</button>
			</div>
		</aside>
	);
};
