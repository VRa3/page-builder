import { availablePremadeComponents } from "./available-premade-components";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
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
        availablePremadeComponents.forEach((component) => {
            const obj = {
                contains: component,
                checked: false,
                inputs: this.fb.array([]),
            };

            for (let input of component.inputs) {
                const key = this.getKeyName(input);
                const value = input[key];

                /**
                 * Watch out - the `value` here might be an array of string, but will be converted to string. Must be fixed
                 */
                obj.inputs.push(this.fb.group({ [key]: value }));
            }

            this.components.push(this.fb.group(obj));
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
}
