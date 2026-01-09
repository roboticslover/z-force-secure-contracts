import { Card, CardContent } from '@/components/ui/card';
import { 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  RefreshCw, 
  BarChart3, 
  Headphones 
} from 'lucide-react';

const WhyUs = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Agencies Only',
      description: 'Every agency undergoes thorough verification including license checks, background verification, and compliance audits.',
    },
    {
      icon: FileCheck2,
      title: 'Contract-Based Hiring',
      description: 'Structured monthly, quarterly, or yearly contracts with clear terms, transparent pricing, and legal protection.',
    },
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Get guards deployed within 48-72 hours. Emergency deployments available for urgent requirements.',
    },
    {
      icon: RefreshCw,
      title: 'Guard Replacement',
      description: 'Not satisfied with a guard? Request replacement at no extra cost. We ensure you get the right fit.',
    },
    {
      icon: BarChart3,
      title: 'Performance Tracking',
      description: 'Track attendance, shifts, and performance metrics. Real-time reporting and incident management.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: '24/7 support team for contract management, escalations, and emergency assistance.',
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
            Enterprise-Grade Security Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for businesses that need reliable, compliant, and professional security services 
            without the hassle of traditional hiring.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
