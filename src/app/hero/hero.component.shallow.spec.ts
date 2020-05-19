import { HeroComponent } from './hero.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(HeroComponent.name, () => {
    let fixture: ComponentFixture<HeroComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeroComponent
            ],
            schemas: [
                NO_ERRORS_SCHEMA // Do no use unless I really need to
            ]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it(`should have the correct hero`, () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it(`should render the hero name in an anchor tag`, () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

        // Necessary To detect changes to bind data to the dom
        fixture.detectChanges();

        // It seems that nativeElement is an 'any' instead of an HTMLElement
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');

        // using the DebugElement for example
        // By.css uses jquery-like syntax from @Angular/platform-browser, NOT protractor
        const debugAnchor = fixture.debugElement.query(By.css('a')).nativeElement;
        expect(debugAnchor.textContent).toContain('SuperDude');
    });
});
