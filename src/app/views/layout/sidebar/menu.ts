import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Components',
    isTitle: true
  },



  {
    label: 'Employees',
    icon: 'file-text',
    subItems: [
      {
        label: 'Add Employee',
        link: '/employees/add-employee',
      },
      
    ]
  },
  {
    label: 'Office',
    icon: 'pie-chart',
    subItems: [
      {
        label: 'Office List',
        link: '/offices/office-list',
      },
      {
        label: 'Add Office',
        link: '/offices/add-office',
      },
      
    ]
  },

  {
    label: 'History',
    icon: 'file-text',
    subItems: [
      {
        label: 'Recived Leaves',
        link: '/leave-lead',
      },
      {
        
          label: 'Attendence List',
          link: 'attendence-admin-all',
        
      },
    ]
  },
 
];



