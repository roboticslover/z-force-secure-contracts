import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle2, ArrowRight, Building2, Users, FileCheck } from 'lucide-react';

const Hero = () => {
  const trustBadges = [
    { icon: CheckCircle2, label: 'Verified Agencies' },
    { icon: FileCheck, label: 'Licensed Guards' },
    { icon: Shield, label: 'Fully Insured' },
  ];

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {trustBadges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary-foreground/10 text-primary-foreground/90 border-primary-foreground/20 px-3 py-1.5"
                >
                  <badge.icon className="h-3.5 w-3.5 mr-1.5 text-accent" />
                  {badge.label}
                </Badge>
              ))}
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Hire Verified{' '}
              <span className="text-gradient">Security Agencies</span>{' '}
              for Your Business
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-primary-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Contract-based security hiring for enterprises. Verified agencies, licensed guards, 
              complete compliance — all in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register?type=client">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow group">
                  Request a Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register?type=agency">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  List Your Agency
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-primary-foreground/10">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-primary-foreground/60">Verified Agencies</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-accent">10K+</div>
                <div className="text-sm text-primary-foreground/60">Guards Deployed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-primary-foreground/60">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative">
              {/* Main Shield */}
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center animate-pulse-glow">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/80 to-navy-700 flex items-center justify-center shadow-2xl">
                  <Shield className="h-32 w-32 text-accent" />
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-8 bg-card rounded-xl p-4 shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-card-foreground">Enterprise</div>
                    <div className="text-xs text-muted-foreground">Grade Security</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 bg-card rounded-xl p-4 shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-card-foreground">24/7</div>
                    <div className="text-xs text-muted-foreground">Guard Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
