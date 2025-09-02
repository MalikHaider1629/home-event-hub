import Navbar from "@/components/Navbar";
import { Receipt, DollarSign } from "lucide-react";

const Expense = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <Receipt className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Expense Tracking</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track and manage all your event expenses with detailed budgeting tools. This feature is coming soon!
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <DollarSign className="h-5 w-5" />
            <span className="font-medium">Under Development</span>
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;