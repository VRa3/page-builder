import { availablePremadeComponents, PremadeComponent } from "./available-premade-components";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { BuilderService } from "../builder.service";

@Component({
    selector: "app-selection-form",
    templateUrl: "./selection-form.component.html",
    styleUrls: ["./selection-form.component.scss"],
})
export class SelectionFormComponent implements OnInit, OnDestroy {
    availableComponentsForm = this.fb.group({
        components: this.fb.array([]),
    });

    get components() {
        return this.availableComponentsForm.get("components") as FormArray;
    }

    private availableComponentsFormSub: Subscription;

    constructor(private fb: FormBuilder, private builderService: BuilderService) {}

    ngOnInit(): void {
        availablePremadeComponents.forEach((component, i) => {
            this.components.push(this.createFormGroupForPremadeComponent(component, false, i));
        });

        this.availableComponentsFormSub = this.availableComponentsForm.valueChanges.subscribe((form) => {
            this.builderService.updateSelectionForm(form);
        });
    }

    ngOnDestroy(): void {
        this.availableComponentsFormSub.unsubscribe();
    }

    onSend() {
        console.log(this.availableComponentsForm);
    }

    getInputs(x) {
        return x.controls.inputs.controls;
    }

    getKeyName(x) {
        return Object.keys(x)[0];
    }

    log(x) {
        console.log(x);
    }

    onGenerateHTML() {
        const a = document.querySelector("app-page-preview");
        const b = a.innerHTML;

        /*
        '<!--container-->'
        '<!--bindings={}--><!--bindings={}-->'
        */

        const cleanHTML = b.replace(/<!--(?!\s*(?:\[if [^\]]+]|<!|>))(?:(?!-->)(.|\n))*-->/g, "");

        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(cleanHTML));
        element.setAttribute("download", "hey.html");

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    duplicate(component: FormGroup) {
        const premadeComponentToAdd = availablePremadeComponents.find(
            (el) => el.componentName === component.value.contains.componentName
        );

        this.components.push(
            this.createFormGroupForPremadeComponent(premadeComponentToAdd, true, this.components.controls.length)
        );
    }

    delete(i: number) {
        this.components.removeAt(i);
    }

    moveComponentUp(i: number) {
        this.components.at(i - 1).value.index = this.components.at(i - 1).value.index + 1;

        const x = this.components.at(i);

        this.components.removeAt(i);

        x.value.index--;

        this.components.insert(i - 1, x);
    }

    moveComponentDown(i: number) {
        this.components.at(i + 1).value.index = this.components.at(i + 1).value.index - 1;

        const x = this.components.at(i);

        this.components.removeAt(i);

        x.value.index++;

        this.components.insert(i + 1, x);
    }

    private createFormGroupForPremadeComponent(
        component: PremadeComponent,
        isDeletable: boolean,
        i: number
    ): FormGroup {
        const obj = {
            contains: component,
            checked: false,
            inputs: this.fb.array([]),
            isDeletable,
            index: i,
        };

        for (let input of component.inputs) {
            const key = this.getKeyName(input);
            const value = input[key];

            /**
             * Watch out - the `value` here might be an array of string, but will be converted to string. Must be fixed
             */
            obj.inputs.push(this.fb.group({ [key]: value }));
        }

        return this.fb.group(obj);
    }
}
