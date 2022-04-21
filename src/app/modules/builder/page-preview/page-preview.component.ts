import { AfterViewInit, Component, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { BuilderService } from "../builder.service";
import { Subscription } from "rxjs";
import { ComponentsFactory } from "./components-factory.class";

@Component({
    selector: "app-page-preview",
    templateUrl: "./page-preview.component.html",
    styleUrls: ["./page-preview.component.scss"],
})
export class PagePreviewComponent implements AfterViewInit, OnDestroy {
    @ViewChild("componentsContainer", { read: ViewContainerRef }) componentsContainer: ViewContainerRef;

    private selectionFormSub = new Subscription();

    constructor(private builderService: BuilderService) {}

    ngAfterViewInit(): void {
        this.builderService.selectionForm$.subscribe(({ components }: any) => {
            this.componentsContainer.clear();

            components.forEach((component) => {
                if (component.checked) {
                    console.log(component);
                    const x = ComponentsFactory.create(component.contains.componentName);

                    //@ts-ignore
                    const componentRef = this.componentsContainer.createComponent(x);

                    component.inputs.forEach((input) => {
                        const [v] = Object.entries(input);

                        const key = v[0] as string;
                        const value = v[1] as string;

                        if (value.length > 0) {
                            if (key === "elements" || key === "dropdownElements") {
                                if (!value.includes(",")) {
                                    return;
                                }
                                componentRef.instance[key] = value.split(",");
                                return;
                            }

                            componentRef.instance[key] = value;
                        }
                    });
                }
            });
        });
    }

    ngOnDestroy() {
        this.selectionFormSub.unsubscribe();
    }
}
