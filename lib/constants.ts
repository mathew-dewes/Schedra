import {SidebarLinkType } from "@/components/component-types";
import { BookingStatusEnum, RenewalStatusEnum } from "./types/enums";

export const publicNavLinks = [
    {href: '/', label: "Home"},
    {href: '/login', label: "Login"},
    {href: '/register', label: "Register"},

];

export const navLinks = [
    {href: '/dashboard', label: "Dashboard"},
    {href: '/bookings', label: "Bookings"},
    {href: '/services', label: "Services"},
    {href: '/availability', label: "Availability"},
    {href: '/customers', label: "Customers"}
];


export const sidebarLinkData: SidebarLinkType = {
  navMain: [
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      items: [
   
               {
          title: "+ Add Booking",
          url: "/dashboard/bookings/new",
        },
   
      
      ],
    },
        {
      title: "Vehicles",
      url: "/dashboard/vehicles",
      items: [
        {
          title: "+ Add vehicle",
          url: "/dashboard/vehicles/new",
          isActive: true,
        },

 
      ],
    },
    {
      title: "Service Centers",
      url: "/dashboard/centers",
      items: [
        {
          title: "+ Add service center",
          url: "/dashboard/centers/new",
          isActive: true,
        },

 
      ],
    },
    {
      title: "Renewals",
      url: "/dashboard/renewals",
      items: [
        {
          title: "+ Add Renewal",
          url: "/dashboard/renewals/new",
          isActive: true,
        },

 
      ],
    },


    {
      title: "Reports",
      url: "/dashboard/reports",
      items: [
        {
          title: "Overview",
          url: "/dashboard/reports",
        },
        {
          title: "Bookings",
          url: "/dashboard/reports/bookings",
        },
        {
          title: "Renewals",
          url: "/dashboard/reports/renewals",
        },
        {
          title: "Vehicles",
          url: "/dashboard/reports/vehicles",
        },
      ],
    },

  ],
};

export const bookingStatusStyles: Record<BookingStatusEnum, string> = {
  Scheduled: "bg-blue-400",
  "In progress": "bg-orange-400 text-black",
  Completed: "bg-green-400",
  Cancelled: "bg-red-400",
}
export const renewalStatusStyles: Record<RenewalStatusEnum, string> = {
  Upcoming: "bg-blue-400",
  Due: "bg-orange-400 text-black",
  Completed: "bg-green-400",
  Overdue: "bg-red-400",
};

export const ACTIVITY_LABELS = {
  service_booking:
    "Service booking created",

  repair_booking:
    "Repair booking created",

  breakdown:
    "Breakdown reported",

  wof_reminder:
    "WOF reminder added",

  registration_reminder:
    "Registration reminder added",

  ruc_reminder:
    "RUC reminder added",

  service_reminder:
    "Service reminder added",
};