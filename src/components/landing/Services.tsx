import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Building2, 
  Factory, 
  GraduationCap, 
  Heart, 
  Calendar, 
  ShoppingBag, 
  Shield 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Security',
      description: 'Housing societies, apartments, and gated communities',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: Building2,
      title: 'Commercial Security',
      description: 'Offices, malls, and commercial buildings',
      color: 'bg-success/10 text-success',
    },
    {
      icon: Factory,
      title: 'Industrial Security',
      description: 'Warehouses, factories, and industrial facilities',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: GraduationCap,
      title: 'Educational Security',
      description: 'Schools, colleges, and educational institutions',
      color: 'bg-destructive/10 text-destructive',
    },
    {
      icon: Heart,
      title: 'Healthcare Security',
      description: 'Hospitals and healthcare facilities',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: Calendar,
      title: 'Event Security',
      description: 'Temporary security for events and gatherings',
      color: 'bg-success/10 text-success',
    },
    {
      icon: ShoppingBag,
      title: 'Retail Security',
      description: 'Stores, showrooms, and retail outlets',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: Shield,
      title: 'VIP Protection',
      description: 'Personal security and executive protection',
      color: 'bg-destructive/10 text-destructive',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
            Security Solutions for Every Industry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From residential complexes to large enterprises, we connect you with verified security agencies 
            that specialize in your industry.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
