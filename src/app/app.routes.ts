import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { ProfileSettingsComponent } from './features/profile/pages/profile-settings/profile-settings.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { OwnerFilteringComponent } from './features/owner-filtering/pages/owner-filtering/owner-filtering.component';
import { AddPropertyComponent } from './features/properties/add-property/add-property.component';
import { PropertyEditComponent } from './features/properties/property-edit/property-edit.component';
import { DetailsComponent } from './features/properties/details/details.component';

export const routes: Routes = [
    {path: 'user', component: HomeComponent },
    {path: '', component: IndexComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'profile-settings', component: ProfileSettingsComponent},
    {path: 'owner-filtering', component: OwnerFilteringComponent},
    {path: 'add-property', component: AddPropertyComponent},
    {path: 'edit-property/:id', component: PropertyEditComponent},
    {path: 'details/:id', component: DetailsComponent},
  ];
