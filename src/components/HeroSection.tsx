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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8 border border-primary/20 animate-fade-in">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Elegant Couple Events
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            Create Your Dream{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Couples Marquee
            </span>{" "}
            Experience
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Transform your special moments into unforgettable celebrations with our 
            premium marquee and event planning services designed for couples.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link to="/event">
              <Button 
                size="lg" 
                className="gap-2 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-scale-in relative overflow-hidden group bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <Calendar className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Start Planning
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 animate-scale-in group"
            >
              <span className="transition-transform duration-300 group-hover:scale-110">Learn More</span>
            </Button>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { title: "Marquee Planning", desc: "Elegant marquee setup & coordination", icon: Calendar },
            { title: "Couple Decoration", desc: "Romantic decor for special moments", icon: Sparkles },
            { title: "Budget Tracking", desc: "Smart expense management for couples", icon: Receipt },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:bg-card/70 transition-all duration-300 hover:scale-105 animate-fade-in group" style={{animationDelay: `${idx * 0.1}s`}}>
                <Icon className="h-8 w-8 text-primary mb-4 mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
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