import { Badge } from '@/components/ui/badge';
import { FileText, Users, CheckCircle, Handshake } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Post Your Requirement',
      description: 'Tell us about your security needs — location, guard count, shift preferences, and contract duration.',
    },
    {
      number: '02',
      icon: Users,
      title: 'Get Agency Proposals',
      description: 'Verified agencies review your requirement and send competitive proposals with guard profiles.',
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Compare & Select',
      description: 'Review proposals, check agency ratings, verify credentials, and shortlist the best fit.',
    },
    {
      number: '04',
      icon: Handshake,
      title: 'Sign Contract & Deploy',
      description: 'Finalize terms, sign the contract digitally, and get guards deployed at your location.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 gradient-navy">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            Simple Process
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Get your security needs fulfilled in four simple steps. Our streamlined process 
            ensures quick deployment with verified agencies.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-accent/50 to-transparent z-0" />
              )}

              <div className="relative z-10">
                {/* Step Number */}
                <div className="text-5xl lg:text-6xl font-bold text-accent/20 mb-4 group-hover:text-accent/30 transition-colors">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="h-7 w-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
