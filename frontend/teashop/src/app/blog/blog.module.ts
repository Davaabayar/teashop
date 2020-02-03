import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { DatePipe } from '@angular/common';

const MY_ROUTES = [
  { path: '', component: BlogComponent },
  { path: 'posts/:id', component: PostDetailsComponent }
];

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MY_ROUTES),
  ],
  bootstrap: [BlogComponent],
  providers: [
    DatePipe
  ]
})
export class BlogModule { }
