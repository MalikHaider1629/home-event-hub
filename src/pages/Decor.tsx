import Navbar from "@/components/Navbar";
import { Palette, Sparkles } from "lucide-react";

const Decor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <Palette className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Decor Management</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plan and manage beautiful decorations for your events. This feature is coming soon!
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Under Development</span>
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decor;