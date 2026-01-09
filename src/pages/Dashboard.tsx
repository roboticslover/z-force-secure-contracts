import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileText,
  ClipboardList,
  FileCheck,
  ArrowRight,
  TrendingUp,
  Users,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

const Dashboard = () => {
  const { profile, role } = useAuth();

  // Mock stats - in real app these would come from the database
  const clientStats = [
    { label: 'Active Contracts', value: '3', icon: FileCheck, trend: '+1 this month', color: 'text-success' },
    { label: 'Open Requirements', value: '2', icon: FileText, trend: 'Awaiting proposals', color: 'text-warning' },
    { label: 'Proposals Received', value: '8', icon: ClipboardList, trend: '5 new', color: 'text-accent' },
    { label: 'Total Locations', value: '4', icon: Building2, trend: 'All covered', color: 'text-muted-foreground' },
  ];

  const agencyStats = [
    { label: 'Active Contracts', value: '5', icon: FileCheck, trend: '+2 this month', color: 'text-success' },
    { label: 'Open Jobs', value: '12', icon: FileText, trend: 'In your area', color: 'text-accent' },
    { label: 'Pending Proposals', value: '3', icon: ClipboardList, trend: 'Awaiting response', color: 'text-warning' },
    { label: 'Guards Deployed', value: '24', icon: Users, trend: 'Across 5 sites', color: 'text-muted-foreground' },
  ];

  const adminStats = [
    { label: 'Total Agencies', value: '156', icon: Shield, trend: '+12 this month', color: 'text-success' },
    { label: 'Total Clients', value: '89', icon: Building2, trend: '+8 this month', color: 'text-accent' },
    { label: 'Pending Verifications', value: '7', icon: AlertCircle, trend: 'Needs review', color: 'text-warning' },
    { label: 'Active Contracts', value: '234', icon: FileCheck, trend: '₹2.4Cr value', color: 'text-muted-foreground' },
  ];

  const getStats = () => {
    if (role === 'admin') return adminStats;
    if (role === 'agency') return agencyStats;
    return clientStats;
  };

  const stats = getStats();

  const getQuickActions = () => {
    if (role === 'client') {
      return [
        { label: 'Post New Requirement', href: '/dashboard/requirements/new', icon: FileText },
        { label: 'View Proposals', href: '/dashboard/proposals', icon: ClipboardList },
        { label: 'Add Location', href: '/dashboard/locations', icon: Building2 },
      ];
    }
    if (role === 'agency') {
      return [
        { label: 'Browse Open Jobs', href: '/dashboard/jobs', icon: FileText },
        { label: 'My Proposals', href: '/dashboard/proposals', icon: ClipboardList },
        { label: 'Update Profile', href: '/dashboard/organization', icon: Building2 },
      ];
    }
    return [
      { label: 'Pending Verifications', href: '/dashboard/verifications', icon: AlertCircle },
      { label: 'Manage Agencies', href: '/dashboard/agencies', icon: Shield },
      { label: 'View All Contracts', href: '/dashboard/contracts', icon: FileCheck },
    ];
  };

  const quickActions = getQuickActions();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {role === 'admin' && 'Manage the platform from your admin dashboard'}
            {role === 'agency' && 'Manage your agency and find new opportunities'}
            {role === 'client' && 'Manage your security requirements and contracts'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4 px-4 hover:bg-accent/5 hover:border-accent/50 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mr-3 group-hover:bg-accent/20 transition-colors">
                      <action.icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role-specific content */}
        {role === 'client' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning" />
                  Pending Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending proposals yet</p>
                  <p className="text-sm">Post a requirement to receive proposals</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Active Contracts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No active contracts</p>
                  <p className="text-sm">Your contracts will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {role === 'agency' && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Recent Job Opportunities
              </CardTitle>
              <CardDescription>Requirements matching your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No matching jobs found</p>
                <p className="text-sm">Complete your profile to see relevant opportunities</p>
              </div>
            </CardContent>
          </Card>
        )}

        {role === 'admin' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Pending Verifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending verifications</p>
                  <p className="text-sm">All agencies are verified</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Platform Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New signups today</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Requirements posted</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Contracts signed</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
