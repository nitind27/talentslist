import { SidebarMenuItem } from './SidebarMenuItem';
import { useIntl } from 'react-intl';

const SidebarMenuMain = () => {
  // const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        // title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        title='Dashboard'
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/bookings"
        icon="calendar"
        title="Bookings"
        fontIcon="calendar"
      />
      <SidebarMenuItem
        to="/profile"
        icon="user"
        title="Profile"
        fontIcon="user"
      />
      <SidebarMenuItem
        to="/services"
        icon="chart-line-star"
        title="Services"
        fontIcon="chart-line-star"
      />
      <SidebarMenuItem
        to="/payments"
        icon="dollar"
        title="Payments"
        fontIcon="dollar"
      />
    </>
  );
};

export { SidebarMenuMain };
