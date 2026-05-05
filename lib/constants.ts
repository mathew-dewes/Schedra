import {SidebarLinkType } from "@/components/component-types";

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


export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;


export const service_durations = ["30", "60", "90", "120", "150", "180"]


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
   
        {
          title: "Calendar",
          url: "/dashboard/bookings/calendar",
        },
      
      ],
    },
    {
      title: "Providers",
      url: "/dashboard/providers",
      items: [
        {
          title: "+ Add providers",
          url: "/dashboard/providers/new",
          isActive: true,
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
          title: "Services",
          url: "/dashboard/reports/services",
        },
        {
          title: "Customers",
          url: "/dashboard/reports/customers",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      items: [
        {
          title: "Business Details",
          url: "/dashboard/settings/business",
        },
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
      ],
    },
  ],
}