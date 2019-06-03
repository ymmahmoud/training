import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import {PopoversComponent} from './popovers.component';
import {ProgressComponent} from './progress.component';
import {TooltipsComponent} from './tooltips.component';
import { ViewChecklistComponent } from './view-checklist.component';
import { EditChecklistComponent } from './edit-checklist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ChecklistmanagerComponent } from './trainer/checklistmanager/checklistmanager.component';
import { SignChecklistComponent } from './trainer/sign-checklist/sign-checklist.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards'
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'carousels',
        component: CarouselsComponent,
        data: {
          title: 'Carousels'
        }
      },
      {
        path: 'collapses',
        component: CollapsesComponent,
        data: {
          title: 'Collapses'
        }
      },
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popover'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
        }
      },
      {
        path: 'view-checklist/:role',
        canActivate: [AuthGuard],
        component: ViewChecklistComponent,
        data: {
          title: 'View Checklist'
        }
      },
      {
        path: 'edit-checklist',
        canActivate: [AuthGuard],
        component: EditChecklistComponent,
        data: {
          title: 'Edit Checklist'
        }
      },
      {
        path: 'userlist',
        canActivate: [AuthGuard],
        component: UserlistComponent,
        data: {
          title: "User List"
        }
      },
      {
        path: 'manage-checklists/:id',
        canActivate: [AuthGuard],
        component: ChecklistmanagerComponent,
        data: {
          title: "Manage Checklists"
        }
      },
      {
        path: 'sign-checklist/:id/:role',
        canActivate: [AuthGuard],
        component: SignChecklistComponent,
        data: {
          title: "Sign Checklist"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
