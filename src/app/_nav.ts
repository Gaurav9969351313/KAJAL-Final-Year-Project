interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Frontend Settings',
    url: '/base',
    icon: 'icon-settings',
    children: [
      {
        name: 'Chat Bot Config',
        url: '/base/chatbotconfig',
        icon: 'icon-puzzle'
      },
      {
        name: 'Chat Bot Menu',
        url: '/base/chatbotmenu',
        icon: 'icon-puzzle'
      },
      {
        name: 'Side Menu',
        url: '/base/sidemenu',
        icon: 'icon-puzzle'
      }
      ,
      {
        name: 'Enable Disable App',
        url: '/base/appenabledisable',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    name: 'Backend Settings',
    url: '/base',
    icon: 'icon-settings',
    children: [
      {
        name: 'Server Config',
        url: '/base/serverconfig',
        icon: 'icon-puzzle'
      },
      {
        name: 'Dimentions Config',
        url: '/base/dimentionsconfig',
        icon: 'icon-puzzle'
      },
      {
        name: 'Default Selections',
        url: '/base/defaultselectionsconfig',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Training Settings',
    url: '/base',
    icon: 'icon-settings',
    children: [
      {
        name: 'Python Training',
        url: '/base/pythontraining',
        icon: 'icon-puzzle'
      },
      {
        name: 'Suggetions',
        url: '/base/suggetions',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Admin',
    url: '/base',
    icon: 'icon-settings',
    children: [
      {
        name: 'Push Notifications',
        url: '/base/pushnotifications',
        icon: 'icon-puzzle'
      },
      {
        name: 'Configure Images',
        url: '/base/configureimages',
        icon: 'icon-puzzle'
      },
      {
        name: 'Configure Help',
        url: '/base/configurehelp',
        icon: 'icon-puzzle'
      },
      {
        name: 'User Management',
        url: '/base/usermanagement',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Version',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: '2.0.0'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Devloper Team',
    url: '/aboutteam',
    icon: 'icon-info',
    class: 'mt-auto',
    variant: 'success',
  }
];
