import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Snippet, SnippetsService } from '@core/snippets';
import { map } from 'rxjs';
import * as _ from 'lodash';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingComponent implements OnInit {
    public snippets$ = this._snippetsService.allSnippets$.pipe(
        map((snippets: Snippet[]) => {
            return [...snippets].sort(
                (snippetA, snippetB) => snippetB.likes - snippetA.likes
            );
        })
    );

    constructor(private readonly _snippetsService: SnippetsService) {}

    public ngOnInit(): void {
        this._snippetsService.getAll();
    }
}
