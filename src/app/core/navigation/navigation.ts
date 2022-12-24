import { NavigationItem } from 'src/app/components/navigation/navigation.model';

export const adminNavigation: NavigationItem[] = [
  {
    id: 'home',
    title: 'Home',
    translateKey: 'AdminNavigations.Home',
    type: 'basic',
    icon: 'mat_outline:home',
    link: '/admin/home',
    disabled: false,
  },
  {
    id: 'accounts',
    title: 'Accounts',
    translateKey: 'AdminNavigations.Accounts',
    type: 'basic',
    icon: 'mat_outline:manage_accounts',
    link: '/admin/accounts',
    disabled: false,
  }
];
