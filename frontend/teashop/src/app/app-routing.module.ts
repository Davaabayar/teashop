import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeaListComponent } from './shop/components/tea/tea-list/tea-list.component';
import { TeaDetailComponent } from './shop/components/tea/tea-detail/tea-detail.component';
import { TeaCreateReactiveComponent } from './shop/components/tea/tea-create-reactive/tea-create-reactive.component';
import { TokenCheckGuard } from "./token-check.guard";

const routes: Routes = [
    { path: 'teas', component: TeaListComponent },
    { path: 'teas/add', canActivate: [TokenCheckGuard], component: TeaCreateReactiveComponent },
    { path: 'teas/:teaId', component: TeaDetailComponent },
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
