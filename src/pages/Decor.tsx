import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Search, Edit, Trash2, Plus, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const decorSchema = z.object({
  id: z.string().min(1, "ID is required"),
  date: z.date({ required_error: "Date is required" }),
  hall: z.string().min(1, "Hall is required"),
  timing: z.string().min(1, "Timing is required"),
  decorAmount: z.coerce.number().min(0, "Decor amount must be positive"),
  spotlightAmount: z.coerce.number().min(0, "Spotlight amount must be positive"),
  coolFireAmount: z.coerce.number().min(0, "Cool fire amount must be positive"),
  coolFireCount: z.coerce.number().min(0, "Cool fire count must be positive"),
  icePotsAmount: z.coerce.number().min(0, "Ice pots amount must be positive"),
  icePotsCount: z.coerce.number().min(0, "Ice pots count must be positive"),
  comment: z.string().optional(),
});

type DecorFormData = z.infer<typeof decorSchema>;

interface DecorItem {
  id: string;
  date: Date;
  hall: string;
  timing: string;
  decorAmount: number;
  spotlightAmount: number;
  coolFireAmount: number;
  coolFireCount: number;
  icePotsAmount: number;
  icePotsCount: number;
  comment?: string;
  totalAmount: number;
}

const Decor = () => {
  const [decorItems, setDecorItems] = useState<DecorItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DecorItem[]>([]);
  const [editingItem, setEditingItem] = useState<DecorItem | null>(null);

  const form = useForm<DecorFormData>({
    resolver: zodResolver(decorSchema),
    defaultValues: {
      id: "",
      hall: "",
      timing: "",
      decorAmount: 0,
      spotlightAmount: 0,
      coolFireAmount: 0,
      coolFireCount: 0,
      icePotsAmount: 0,
      icePotsCount: 0,
      comment: "",
    },
  });

  const halls = ["Grand Ballroom", "Garden Pavilion", "Rooftop Terrace"];
  const timings = ["Lunch", "Dinner"];

  const calculateTotal = (data: DecorFormData): number => {
    return data.decorAmount + data.spotlightAmount + 
           (data.coolFireAmount * data.coolFireCount) + 
           (data.icePotsAmount * data.icePotsCount);
  };

  const onSubmit = (data: DecorFormData) => {
    const totalAmount = calculateTotal(data);
    const decorData: DecorItem = {
      id: data.id,
      date: data.date,
      hall: data.hall,
      timing: data.timing,
      decorAmount: data.decorAmount,
      spotlightAmount: data.spotlightAmount,
      coolFireAmount: data.coolFireAmount,
      coolFireCount: data.coolFireCount,
      icePotsAmount: data.icePotsAmount,
      icePotsCount: data.icePotsCount,
      comment: data.comment,
      totalAmount,
    };

    if (editingItem) {
      setDecorItems(decorItems.map(item => 
        item.id === editingItem.id ? decorData : item
      ));
      setEditingItem(null);
    } else {
      setDecorItems([...decorItems, decorData]);
    }
    form.reset();
  };

  const handleSearch = () => {
    const results = decorItems.filter(item => 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(item.date, "yyyy-MM-dd").includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleEdit = (item: DecorItem) => {
    setEditingItem(item);
    form.reset({
      id: item.id,
      date: item.date,
      hall: item.hall,
      timing: item.timing,
      decorAmount: item.decorAmount,
      spotlightAmount: item.spotlightAmount,
      coolFireAmount: item.coolFireAmount,
      coolFireCount: item.coolFireCount,
      icePotsAmount: item.icePotsAmount,
      icePotsCount: item.icePotsCount,
      comment: item.comment,
    });
  };

  const handleDelete = (itemId: string) => {
    setDecorItems(decorItems.filter(item => item.id !== itemId));
    setSearchResults(searchResults.filter(item => item.id !== itemId));
  };

  const grandTotal = decorItems.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Decor Management</h1>
            <p className="text-muted-foreground">Manage decorations and calculate costs for your events</p>
          </div>
          <Card className="min-w-[200px]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{grandTotal.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Decor Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingItem ? "Edit Decor Details" : "Add Decor Details"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Auto-filled from Event" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="hall"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hall Name</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select hall" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {halls.map((hall) => (
                                <SelectItem key={hall} value={hall}>
                                  {hall}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timing</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timing" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timings.map((timing) => (
                                <SelectItem key={timing} value={timing}>
                                  {timing}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="decorAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Decor Amount (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spotlightAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spotlight Amount (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Cool Fire</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="coolFireAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="coolFireCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Count</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Ice Pots</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="icePotsAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount (₹)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="icePotsCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Count</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any additional comments..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    {editingItem ? "Update Decor Details" : "Add Decor Details"}
                  </Button>
                  
                  {editingItem && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setEditingItem(null);
                        form.reset();
                      }}
                    >
                      Cancel Edit
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Search and Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Decor Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by ID or Date (YYYY-MM-DD)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Search Results:</h3>
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-border rounded-lg bg-card"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">ID: {item.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(item.date, "PPP")} • {item.timing}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><span className="font-medium">Hall:</span> {item.hall}</p>
                        <p><span className="font-medium">Total:</span> ₹{item.totalAmount.toLocaleString()}</p>
                        <p><span className="font-medium">Decor:</span> ₹{item.decorAmount}</p>
                        <p><span className="font-medium">Spotlight:</span> ₹{item.spotlightAmount}</p>
                        <p><span className="font-medium">Cool Fire:</span> ₹{item.coolFireAmount} × {item.coolFireCount}</p>
                        <p><span className="font-medium">Ice Pots:</span> ₹{item.icePotsAmount} × {item.icePotsCount}</p>
                      </div>
                      {item.comment && (
                        <p className="text-sm mt-2"><span className="font-medium">Comment:</span> {item.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {searchTerm && searchResults.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No decor items found matching your search.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Decor;