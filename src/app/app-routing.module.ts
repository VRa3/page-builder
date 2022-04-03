import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/page-builder", pathMatch: "full" },
    {
        path: "page-builder",
        loadChildren: () => import("./modules/builder/builder.module").then((m) => m.BuilderModule),
    },
    { path: "**", redirectTo: "/page-builder" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
