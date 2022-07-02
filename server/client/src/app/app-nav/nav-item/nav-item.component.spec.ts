import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavItemConfig } from '../models';

import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {
    let component: NavItemComponent;
    let fixture: ComponentFixture<NavItemComponent>;

    const config: NavItemConfig = {
        title: 'Nav item',
        route: '/',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavItemComponent],
            imports: [CommonModule, RouterTestingModule.withRoutes([])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavItemComponent);
        component = fixture.componentInstance;
        component.config = config;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
