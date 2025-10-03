import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	User,
	Mail,
	MapPin,
	Building2,
	Shield,
	Calendar,
	Key,
} from 'lucide-react';

export default function Profile() {
	const { session } = useAuth();

	if (!session?.user) {
		return null;
	}

	const { user } = session;

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<Layout>
			<div className="p-8 max-w-5xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-semibold text-foreground mb-2">
						Profile
					</h1>
					<p className="text-muted-foreground">
						View and manage your account information
					</p>
				</div>

				<div className="grid gap-6">
					{/* Personal Information */}
					<Card className="shadow-elegant border-gray-200">
						<CardHeader>
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
									<User className="w-6 h-6 text-primary-foreground" />
								</div>
								<div>
									<CardTitle>Personal Information</CardTitle>
									<CardDescription>Your account details</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
										<User className="w-4 h-4" />
										Full Name
									</label>
									<p className="text-base font-medium text-foreground">
										{user.firstName} {user.lastName}
									</p>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
										<Mail className="w-4 h-4" />
										Email Address
									</label>
									<p className="text-base font-medium text-foreground">
										{user.email}
									</p>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
										<MapPin className="w-4 h-4" />
										Country
									</label>
									<p className="text-base font-medium text-foreground">
										{user.country || 'Not specified'}
									</p>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
										<Shield className="w-4 h-4" />
										Role
									</label>
									<div>
										<Badge variant="secondary" className="font-medium">
											{user.role}
										</Badge>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Company Information */}
					{user.company && (
						<Card className="shadow-elegant border-gray-200">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
										<Building2 className="w-6 h-6 text-foreground" />
									</div>
									<div>
										<CardTitle>Company Information</CardTitle>
										<CardDescription>Your organization details</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
											<Building2 className="w-4 h-4" />
											Company Name
										</label>
										<p className="text-base font-medium text-foreground">
											{user.company.name}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</Layout>
	);
}
