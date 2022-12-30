import { NavigationItem } from 'src/app/components/navigation/navigation.model';

export const adminNavigation: NavigationItem[] = [
  // {
  //   id: 'home',
  //   title: 'Home',
  //   translateKey: 'AdminNavigations.Home',
  //   type: 'basic',
  //   icon: 'mat_outline:home',
  //   link: '/admin/home',
  //   disabled: false,
  // },
  {
    id: 'users',
    title: 'Users',
    translateKey: 'AdminNavigations.Users',
    type: 'basic',
    icon: 'mat_outline:manage_accounts',
    link: '/admin/users',
    disabled: false,
  }
];
