import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeaListComponent } from './teas/tea-list/tea-list.component';
import { TeaDetailComponent } from './teas/tea-detail/tea-detail.component';
import { TeaCreateReactiveComponent } from './teas/tea-create-reactive/tea-create-reactive.component';

const routes: Routes = [
    { path: 'teas', component:TeaListComponent},
    { path: 'teas/add', component:TeaCreateReactiveComponent},  
    { path: 'teas/:teaId', component:TeaDetailComponent},
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}