import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { CreateProfile } from './create-profile/create-profile';
import { ViewProfile } from './view-profile/view-profile';
import { Profiles } from './profiles/profiles';
import { EditProfile } from './edit-profile/edit-profile';
import { DeleteProfile } from './delete-profile/delete-profile';
import { Logout } from './logout/logout';
import { Intro} from './intro/intro';
import { Home} from './home/home';


export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'createProfile', component: CreateProfile },
  { path: 'viewProfile', component: ViewProfile },
  { path: 'profiles', component: Profiles },
  { path: 'editProfile', component: EditProfile },
  { path: 'deleteProfile', component: DeleteProfile },
  { path: 'logout', component: Logout },
  { path: '', component: Intro },
  { path: 'home', component: Home }
];
