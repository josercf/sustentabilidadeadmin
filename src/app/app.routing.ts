import { Routes, RouterModule } from "@angular/router";
import { PlacesListComponent } from "./places-list/places-list.component";
import { PlacesManagerComponent } from "./places-manager/places-manager.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "add", component: PlacesManagerComponent },
    { path: "edit/:key", component: PlacesManagerComponent },
    { path: "all", component: PlacesListComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);
