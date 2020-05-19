import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";
import { of } from "rxjs/internal/observable/of";
import { By } from "@angular/platform-browser";

@Component({
    selector: 'app-hero',
    template: '<div></div>'
})
class MockHeroComponent {
    @Input() hero;
}

describe(`${HeroesComponent.name} (shallow tests)`, () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                MockHeroComponent /* Overly-Verbose way of creating a schema object for use */
            ],
            providers: [{provide: HeroService, useValue: mockHeroService}],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ] /*THIS IS ANOTHER RIGHT WAY TO DO IT, NOT THE "NO_ELEMENTS_SCHEMA" WAY OF DOING IT */
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it(`should set heroes correctly from the service`, () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
        expect(fixture.componentInstance.heroes).toBe(HEROES);
    });

    it(`should create a list item per hero`, () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const listItems = fixture.debugElement.queryAll(By.css('ul.heroes>li'));
        expect(listItems.length).toBe(3);
    })
})