import { Directive, ElementRef, HostListener, Input } from '@angular/core';

enum Actions {
    Remove = 'remove',
    Add = 'add',
}

@Directive({
    selector: '[hover-classes]',
})
export class MouseHoverDirective {
    @Input('hover-classes')
    public hoverClasses!: string;

    constructor(private _elementRef: ElementRef) {}

    protected update(action: string): void {
        console.log(this.hoverClasses);
        this.hoverClasses
            .split(' ')
            .forEach((item) =>
                this._elementRef.nativeElement.classList[action](item)
            );
    }

    @HostListener('mouseover')
    public onMouseOver() {
        this.update(Actions.Add);
    }

    @HostListener('mouseout')
    public onMouseOut() {
        this.update(Actions.Remove);
    }
}
