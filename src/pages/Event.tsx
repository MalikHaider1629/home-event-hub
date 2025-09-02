import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Search, Edit, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const eventSchema = z.object({
  id: z.string().min(1, "ID is required"),
  date: z.date({ required_error: "Date is required" }),
  clientName: z.string().min(1, "Client name is required"),
  hallName: z.string().min(1, "Hall selection is required"),
  eventType: z.string().min(1, "Event type is required"),
  timeSlot: z.array(z.number()).length(1),
});

type EventFormData = z.infer<typeof eventSchema>;

interface Event {
  id: string;
  date: Date;
  clientName: string;
  hallName: string;
  eventType: string;
  timeSlot: number[];
}

const Event = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      id: "",
      clientName: "",
      hallName: "",
      eventType: "",
      timeSlot: [0],
    },
  });

  const halls = ["Grand Ballroom", "Garden Pavilion", "Rooftop Terrace"];
  const eventTypes = ["Wedding", "Birthday", "Corporate", "Anniversary", "Graduation"];

  const onSubmit = (data: EventFormData) => {
    const eventData: Event = {
      id: data.id,
      date: data.date,
      clientName: data.clientName,
      hallName: data.hallName,
      eventType: data.eventType,
      timeSlot: data.timeSlot,
    };

    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id ? eventData : event
      ));
      setEditingEvent(null);
    } else {
      setEvents([...events, eventData]);
    }
    form.reset();
  };

  const handleSearch = () => {
    const results = events.filter(event => 
      event.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(event.date, "yyyy-MM-dd").includes(searchTerm)
    );
    setSearchResults(results);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    form.reset({
      id: event.id,
      date: event.date,
      clientName: event.clientName,
      hallName: event.hallName,
      eventType: event.eventType,
      timeSlot: event.timeSlot,
    });
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSearchResults(searchResults.filter(event => event.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Management</h1>
          <p className="text-muted-foreground">Create and manage your events efficiently</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Event Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingEvent ? "Edit Event" : "Create New Event"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event ID" {...field} />
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
                        <FormLabel>Event Date</FormLabel>
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
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hallName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hall Name</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a hall" />
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
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
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
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Time Slot: {field.value[0] === 0 ? "Lunch" : "Dinner"}
                        </FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={1}
                            step={1}
                            value={field.value}
                            onValueChange={field.onChange}
                            className="w-full"
                          />
                        </FormControl>
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>Lunch</span>
                          <span>Dinner</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    {editingEvent ? "Update Event" : "Create Event"}
                  </Button>
                  
                  {editingEvent && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setEditingEvent(null);
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
                Search Events
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
                  {searchResults.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-border rounded-lg bg-card"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">ID: {event.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(event.date, "PPP")}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p><span className="font-medium">Client:</span> {event.clientName}</p>
                      <p><span className="font-medium">Hall:</span> {event.hallName}</p>
                      <p><span className="font-medium">Type:</span> {event.eventType}</p>
                      <p><span className="font-medium">Time:</span> {event.timeSlot[0] === 0 ? "Lunch" : "Dinner"}</p>
                    </div>
                  ))}
                </div>
              )}

              {searchTerm && searchResults.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No events found matching your search.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Event;