import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary-foreground">Z-Force</span>
                <span className="text-xs text-primary-foreground/70 -mt-1">Security Platform</span>
              </div>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              India's leading B2B security services marketplace. Connecting businesses with verified security agencies.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Mail className="h-5 w-5 text-primary-foreground/70" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/20 transition-colors">
                <Phone className="h-5 w-5 text-primary-foreground/70" />
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">For Clients</h4>
            <ul className="space-y-3">
              <li><Link to="/register?type=client" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Post Requirement</Link></li>
              <li><a href="#services" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Browse Services</a></li>
              <li><a href="#how-it-works" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* For Agencies */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">For Agencies</h4>
            <ul className="space-y-3">
              <li><Link to="/register?type=agency" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">List Your Agency</Link></li>
              <li><a href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Verification Process</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Partner Benefits</a></li>
              <li><a href="#" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/60">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">contact@zforce.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2025 Z-Force Security Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
