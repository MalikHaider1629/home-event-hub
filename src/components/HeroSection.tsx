import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8 border border-primary/20">
            <Sparkles className="h-4 w-4" />
            Professional Event Management
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Plan Your{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Perfect Events
            </span>{" "}
            Effortlessly
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, manage every detail 
            with our comprehensive event planning platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/event">
              <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <Calendar className="h-5 w-5" />
                Start Planning
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { title: "Event Planning", desc: "Complete event management tools", icon: Calendar },
            { title: "Decoration", desc: "Beautiful decor planning & tracking", icon: Sparkles },
            { title: "Expense Tracking", desc: "Budget management made simple", icon: Receipt },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:bg-card/70 transition-all duration-300">
                <Icon className="h-8 w-8 text-primary mb-4 mx-auto" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;