import { Link, useLocation } from 'react-router-dom';
import { Gem, Package, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
	{ name: 'Inventory', href: '/', icon: Package },
	{ name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
	const location = useLocation();

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
		</aside>
	);
};
