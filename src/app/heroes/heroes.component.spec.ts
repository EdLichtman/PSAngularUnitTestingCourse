import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs/internal/observable/of';

describe(HeroesComponent.name, () => {
    let component: HeroesComponent;
    let HEROES: Hero[];
    let mockHeroService: any;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);

        component.heroes = HEROES;
    });

    describe('delete', () => {
        it('should remove a hero from heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        });

        it('should remove indicated hero from heroes list', () => {
            const hero2 = HEROES[2];
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.delete(hero2);
            const heroesThatMatchHero2 = component.heroes.filter(hero => hero.id === hero2.id);

            expect(heroesThatMatchHero2.length).toBe(0);
        });

        it(`should call ${HeroService.name}.deleteHero with the correct hero`, () => {
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });

        it(`should call subscribe on ${HeroService.name}.deleteHero`, () => {
            const mockObservable = jasmine.createSpyObj(['subscribe']);
            mockHeroService.deleteHero.and.returnValue(mockObservable);

            component.delete(HEROES[2]);

            expect(mockObservable.subscribe).toHaveBeenCalled();
        });

        xit(`should be an ignored test by putting x in front of it`, () => {
            expect(true).toBe(false);
        })
    });
});
