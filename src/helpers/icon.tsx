import React from 'react';
import { IoCarSport, IoCarSportOutline, IoStarOutline } from 'react-icons/io5';
import { LiaSnowflake } from 'react-icons/lia';
import { LuBatteryCharging, LuCalendar, LuClock, LuCarFront, LuCircleDot, LuDroplet, LuLink2, LuMonitorCog, LuPackage, LuSettings, LuSettings2, LuSnowflake, LuWrench, LuMail, LuMapPin, LuPhone, LuShieldCheck, LuStar, LuTag, LuUser } from 'react-icons/lu';
import { PiTire } from 'react-icons/pi';


const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'Clock': LuClock,
  'car': IoCarSportOutline,
  'tire': PiTire,
  'DIAGNOSTICS': LuMonitorCog,
  'SUSPENSION': LuSettings2,
  'PARTS': LuPackage,
  'TIMING_BELT': LuSettings,
  'BATTERY': LuBatteryCharging,
  'OIL_FILTER': LuDroplet,
  'TOW_HITCH': LuLink2,
  'snowflake': LiaSnowflake,
  'wrench': LuWrench,
  'envelope': LuMail,
  'map': LuMapPin,
  'phone': LuPhone,
  'shield': LuShieldCheck,
  'tag': LuTag,
  'star': IoStarOutline,
  'user': LuUser,
  'calendar': LuCalendar, LuClock,
};

interface IconFromHygraphProps {
  icon?: string;
  class?: string;
}

export const IconFromHygraph: React.FC<IconFromHygraphProps> = ({ icon, class: className }) => {
  if (!icon) return null;

  const Icon = ICON_MAP[icon];
  if (!Icon) return null;

  return <Icon className={className} />;
};



