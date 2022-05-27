import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Snippet } from '@core/snippets';
import { GUID } from '@shared/models';

@Component({
    selector: 'app-snippet-list-item',
    templateUrl: './snippet-list-item.component.html',
    styleUrls: ['./snippet-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetListItemComponent {
    @Output()
    public openSnippetEventEmitter: EventEmitter<GUID> = new EventEmitter();

    @Input()
    snippet!: Snippet;

    public onClick(): void {
        this.openSnippetEventEmitter.emit(this.snippet.id);
    }
}
