import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeaListComponent } from './teas/tea-list/tea-list.component';
import { TeaCreateComponent } from './teas/tea-create/tea-create.component';

const routes: Routes = [
    { path: 'teas', component:TeaListComponent},
    { path: 'teas/add', component:TeaCreateComponent},
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}