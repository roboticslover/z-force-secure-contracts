import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Shield } from 'lucide-react';

const CTA = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Clients */}
          <div className="relative overflow-hidden rounded-2xl gradient-hero p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                <Building2 className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
                Need Security for Your Business?
              </h3>
              <p className="text-primary-foreground/70 mb-8 max-w-md">
                Post your requirement and receive proposals from verified security agencies. 
                Compare, negotiate, and deploy guards within days.
              </p>
              <Link to="/register?type=client">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                  Get Started as Client
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* For Agencies */}
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Are You a Security Agency?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                List your agency on Z-Force and get access to enterprise clients. 
                Grow your business with verified leads and contract opportunities.
              </p>
              <Link to="/register?type=agency">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground group">
                  List Your Agency
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
