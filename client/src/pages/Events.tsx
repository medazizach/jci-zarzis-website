import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight, Users, X, Calendar, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import type { Event as ApiEvent } from "@shared/schema";

const frenchMonths = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const frenchDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function parseEventDate(dateStr: string): { day: number; month: number; year: number } | null {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return {
      year: parseInt(parts[0]),
      month: parseInt(parts[1]) - 1,
      day: parseInt(parts[2])
    };
  }
  return null;
}

export default function Events() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null);

  const { data: events = [], isLoading } = useQuery<ApiEvent[]>({
    queryKey: ["/api/events"],
  });

  const daysInMonth = getDaysInMonth(displayMonth, displayYear);
  const firstDay = getFirstDayOfMonth(displayMonth, displayYear);

  const eventsWithDates = useMemo(() => {
    return events.map(event => {
      const parsed = parseEventDate(event.date);
      return { ...event, parsed };
    }).filter(e => e.parsed !== null);
  }, [events]);

  const monthEvents = useMemo(() => {
    return eventsWithDates.filter(e => 
      e.parsed && e.parsed.month === displayMonth && e.parsed.year === displayYear
    );
  }, [eventsWithDates, displayMonth, displayYear]);

  const eventsByDay = useMemo(() => {
    const map: Record<number, typeof eventsWithDates> = {};
    monthEvents.forEach(event => {
      if (event.parsed) {
        const day = event.parsed.day;
        if (!map[day]) map[day] = [];
        map[day].push(event);
      }
    });
    return map;
  }, [monthEvents]);

  const selectedDayEvents = selectedDay ? eventsByDay[selectedDay] || [] : [];

  const today = new Date(currentYear, currentMonth, now.getDate());

  const upcomingEvents = useMemo(() => {
    return eventsWithDates
      .filter(e => e.parsed && new Date(e.parsed.year, e.parsed.month, e.parsed.day) >= today)
      .sort((a, b) => {
        if (!a.parsed || !b.parsed) return 0;
        return new Date(a.parsed.year, a.parsed.month, a.parsed.day).getTime() - 
               new Date(b.parsed.year, b.parsed.month, b.parsed.day).getTime();
      })
      .slice(0, 4);
  }, [eventsWithDates, today]);

  const pastEvents = useMemo(() => {
    return eventsWithDates
      .filter(e => e.parsed && new Date(e.parsed.year, e.parsed.month, e.parsed.day) < today)
      .sort((a, b) => {
        if (!a.parsed || !b.parsed) return 0;
        return new Date(b.parsed.year, b.parsed.month, b.parsed.day).getTime() - 
               new Date(a.parsed.year, a.parsed.month, a.parsed.day).getTime();
      })
      .slice(0, 5);
  }, [eventsWithDates, today]);

  const goToPrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
    setSelectedDay(null);
  };

  const goToToday = () => {
    setDisplayMonth(currentMonth);
    setDisplayYear(currentYear);
    setSelectedDay(null);
  };

  const prevMonthDays = displayMonth === 0 
    ? getDaysInMonth(11, displayYear - 1) 
    : getDaysInMonth(displayMonth - 1, displayYear);
  
  const calendarDays: { day: number; isCurrentMonth: boolean }[] = [];
  
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ 
      day: prevMonthDays - firstDay + 1 + i, 
      isCurrentMonth: false 
    });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, isCurrentMonth: true });
  }
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({ day, isCurrentMonth: false });
  }

  const isToday = (day: number) => {
    return day === now.getDate() && displayMonth === currentMonth && displayYear === currentYear;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Événements
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-events-heading">
              Calendrier des Événements
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-events-description">
              Découvrez nos événements et activités. Cliquez sur une date pour voir les détails.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/50" data-testid="card-calendar">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-foreground" data-testid="text-calendar-month">
                      {frenchMonths[displayMonth]} {displayYear}
                    </h2>
                    {(displayMonth !== currentMonth || displayYear !== currentYear) && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={goToToday}
                        data-testid="button-today"
                      >
                        Aujourd'hui
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={goToPrevMonth}
                      data-testid="button-prev-month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={goToNextMonth}
                      data-testid="button-next-month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {frenchDays.map((day) => (
                    <div 
                      key={day} 
                      className="p-2 text-center text-sm font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                  
                  {calendarDays.map((cell, index) => {
                    const { day, isCurrentMonth } = cell;
                    const hasEvents = isCurrentMonth && eventsByDay[day];
                    const isSelected = isCurrentMonth && day === selectedDay;
                    const isTodayDate = isCurrentMonth && isToday(day);
                    
                    return (
                      <div
                        key={index}
                        onClick={() => isCurrentMonth && setSelectedDay(isSelected ? null : day)}
                        className={`
                          relative p-2 min-h-[60px] sm:min-h-[80px] rounded-md transition-all duration-200
                          ${isCurrentMonth 
                            ? 'cursor-pointer hover:bg-muted/50' 
                            : 'bg-muted/20 border border-dashed border-border/30'
                          }
                          ${isSelected ? 'bg-primary/10 ring-2 ring-primary' : ''}
                          ${isTodayDate && !isSelected ? 'bg-primary/5' : ''}
                        `}
                        data-testid={isCurrentMonth ? `calendar-day-${day}` : `calendar-padding-${index}`}
                        aria-hidden={!isCurrentMonth}
                      >
                        <span className={`
                          text-sm font-medium
                          ${!isCurrentMonth 
                            ? 'text-muted-foreground/40' 
                            : isTodayDate 
                              ? 'text-primary font-bold' 
                              : 'text-foreground'
                          }
                        `}>
                          {day}
                        </span>
                        {hasEvents && (
                          <div className="mt-1 space-y-1">
                            {eventsByDay[day].slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary truncate"
                                data-testid={`calendar-event-${event.id}`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {eventsByDay[day].length > 2 && (
                              <div className="text-[10px] text-muted-foreground">
                                +{eventsByDay[day].length - 2} autres
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary/20" />
                    <span>Événement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-primary/5 ring-1 ring-primary/30" />
                    <span>Aujourd'hui</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/50 sticky top-24" data-testid="card-day-events">
                <h3 className="text-lg font-bold text-foreground mb-4" data-testid="text-selected-day-title">
                  {selectedDay 
                    ? `${selectedDay} ${frenchMonths[displayMonth]}` 
                    : "Sélectionnez une date"}
                </h3>
                
                {selectedDay ? (
                  selectedDayEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDayEvents.map((event) => (
                        <div 
                          key={event.id} 
                          className="p-4 rounded-md bg-muted/50 border border-border/30"
                          data-testid={`selected-event-${event.id}`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-foreground" data-testid={`text-event-title-${event.id}`}>
                              {event.title}
                            </h4>
                            {event.category && (
                              <Badge variant="secondary" className="text-xs flex-shrink-0">
                                {event.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" data-testid={`text-event-desc-${event.id}`}>
                            {event.description}
                          </p>
                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-primary" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-primary" />
                              <span>{event.location}</span>
                            </div>
                            {event.attendees && (
                              <div className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-primary" />
                                <span>{event.attendees} participants</span>
                              </div>
                            )}
                          </div>
                          <Link href="/contact">
                            <Button 
                              size="sm" 
                              className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80"
                              data-testid={`button-register-${event.id}`}
                            >
                              S'inscrire
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm" data-testid="text-no-events">
                      Aucun événement prévu ce jour.
                    </p>
                  )
                ) : (
                  <p className="text-muted-foreground text-sm" data-testid="text-select-date">
                    Cliquez sur une date du calendrier pour voir les événements prévus.
                  </p>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                À Venir
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight" data-testid="text-upcoming-events-heading">
                Prochains Événements
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className="group p-6 h-full border border-border/50 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-card to-card/50 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                    data-testid={`card-upcoming-event-${event.id}`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-md bg-gradient-to-br from-primary to-primary/70 flex flex-col items-center justify-center text-white">
                          <span className="text-xl font-bold leading-none">
                            {event.parsed?.day}
                          </span>
                          <span className="text-[10px] uppercase mt-0.5">
                            {event.parsed && frenchMonths[event.parsed.month]?.slice(0, 3)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          {event.category && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {event.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pastEvents.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Badge variant="outline" className="mb-4 text-muted-foreground border-muted-foreground/30">
                Passés
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight" data-testid="text-past-events-heading">
                Événements Récents
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className="group h-full border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                    data-testid={`card-past-event-${event.id}`}
                  >
                    {event.imageUrl && (
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <div className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-white text-xs">
                            {event.parsed && `${event.parsed.day} ${frenchMonths[event.parsed.month]} ${event.parsed.year}`}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        {event.category && (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            {event.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {event.description}
                      </p>
                      {event.highlights && event.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {event.highlights.slice(0, 2).map((highlight, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {highlight}
                            </span>
                          ))}
                          {event.highlights.length > 2 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              +{event.highlights.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-card rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-event"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                data-testid="button-close-event-modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              {selectedEvent.imageUrl && (
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
              )}
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const parsed = parseEventDate(selectedEvent.date);
                    return (
                      <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary to-primary/70 flex flex-col items-center justify-center text-white">
                        <span className="text-lg font-bold leading-none">
                          {parsed?.day}
                        </span>
                        <span className="text-[10px] uppercase">
                          {parsed && frenchMonths[parsed.month]?.slice(0, 3)}
                        </span>
                      </div>
                    );
                  })()}
                  <div>
                    {selectedEvent.category && (
                      <Badge variant="outline" className="mb-1 text-primary border-primary/30">
                        {selectedEvent.category}
                      </Badge>
                    )}
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-modal-event-title">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-modal-event-description">
                  {selectedEvent.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  {selectedEvent.attendees && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{selectedEvent.attendees} participants</span>
                    </div>
                  )}
                </div>
                
                {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">Points forts</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.highlights.map((highlight, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-modal-register">
                      S'inscrire
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => setSelectedEvent(null)} data-testid="button-modal-event-close">
                    Fermer
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Vous Voulez Participer ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Rejoignez-nous pour nos prochains événements et faites partie de notre communauté dynamique.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-contact-cta">
                Nous Contacter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
