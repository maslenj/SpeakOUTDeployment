"use client"

import { EventCard } from "@/components/EventCard"
import Typography from "@/components/Typography";
import prisma from "@/lib/prisma";
import { useEffect, useState } from "react";

interface Event {
  title: string,
  tags: string[],
  start: string,
  end: string,
  status: string,
  image: string,
}


export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    fetch("/api/engagements")
      .then(res => res.json()
        .then(data => {
          console.log(data)
          setEvents(data)
        }))
  }, [])

  return (

    <div className="mx-20">
      <div className="mb-2 mt-5">
        <Typography variant="h1"> Events List </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.map(event => (
          <EventCard
            title={event.title}
            start={event.start}
            end={event.end}
            status={event.status}
            image={event.image}
          />
        ))}
      </div>
    </div>

  );
}