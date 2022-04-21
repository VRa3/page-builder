import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BuilderService {
    // @todo: add missing type for this form object
    private _selectionForm$ = new Subject();
    selectionForm$ = this._selectionForm$.asObservable();

    updateSelectionForm(v) {
        this._selectionForm$.next(v);
    }
}
