import React, { ReactElement } from "react";
import { KTIcon } from "@/_metronic/helpers";

interface Option {
  name: string;
  image: string;
}

interface Time {
  day: string;
  startTime: string;
  endTime: string;
}

interface Service {
  title: string;
  price: number;
  performanceType: string;
  promotion: string;
  skills: string[];
  duration: string;
}

interface Data {
  bookingDays: {
    title: string;
    icon: ReactElement;
    location: string;
  };
  servicesDataEvents: Service[];
  AddServiceData: {
    status: string[];
    skills: string[];
  };
  platform: {
    title: string;
    icon: ReactElement;
    options: Option[];
  };
  cancellation: {
    title: string;
    icon: ReactElement;
    content: string[];
  };
  bookingServices: {
    title: string;
    icon: ReactElement;
    times: Time[];
  };
}

const ServicesData: Data = {
  bookingDays: {
    title: "Travel Preferences",
    icon: <KTIcon iconName="map" iconType="duotone" className="fs-2" />,
    location: "Dubai",
  },
  servicesDataEvents:[
    {
      title: 'Wedding performance',
      price: 1,
      performanceType: 'Online',
      promotion: 'No',
      skills: ['Musician', 'Pianist'],
      duration: '60 min',
    },
    {
      title: 'Photography session',
      price: 1,
      performanceType: 'Online',
      promotion: 'No',
      skills: ['Photography', 'Beauty'],
      duration: '120 min',
    },
  ],
  AddServiceData: {
    status: ["All", "Enabled", "Disabled"],
    skills: ["All", "Photography", "Musician"],
  },
  platform: {
    title: "Platform",
    icon:  <KTIcon iconName="profile-user" iconType="duotone" className="fs-2" />,
    options: [
      { name: "Google Meet", image: "../../media/googlemeeticon.png" },
      { name: "Teams", image: "../../media/teamicon.png" },
      { name: "skype", image: "../../media/skypeicon.png" },
      { name: "Zoom", image: "../../media/zoomicon.png" },
    ],
  },
  cancellation: {
    title: "Cancellation",
    icon: <KTIcon iconName="cross-circle" iconType="duotone" className="fs-2" />,
    content: [
      "Free cancellation before 5 Hour (s) of booking.",
      "10% cancellation charges.",
    ],
  },
  bookingServices: {
    title: "Booking Availability",
    icon: <KTIcon iconName="calendar" iconType="duotone" className="fs-2" />,
    times: [
      { day: "Sunday", startTime: "10:00 AM", endTime: "11:00 PM" },
      { day: "Monday", startTime: "10:00 AM", endTime: "11:00 PM" },
      { day: "Tuesday", startTime: "10:00 AM", endTime: "11:00 PM" },
      { day: "Wednesday", startTime: "10:00 AM", endTime: "11:00 PM" },
  
    ],
  },
};

export default ServicesData;
