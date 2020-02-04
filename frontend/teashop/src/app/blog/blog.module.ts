import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { DatePipe } from '@angular/common';
import { PostAddDialogComponent } from './components/post-add-dialog/post-add-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialModule } from '../app-material.module';
import { SharedModule } from '../shared.module';

const MY_ROUTES = [
  { path: '', component: BlogComponent },
  { path: 'posts/:id', component: PostDetailsComponent }
];

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    PostDetailsComponent,
    PostAddDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(MY_ROUTES),
    AngularEditorModule,
    SharedModule
  ],
  entryComponents: [
    PostAddDialogComponent
  ],
  bootstrap: [
    BlogComponent
  ],
  providers: [
    DatePipe
  ]
})
export class BlogModule { }
