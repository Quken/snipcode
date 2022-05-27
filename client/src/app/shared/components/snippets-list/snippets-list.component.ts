import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Snippet } from '@core/snippets';

@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    styleUrls: ['./snippets-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetsListComponent {
    @Input()
    public snippets: Snippet[] = [];
}
