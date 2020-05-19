import { ComponentFixture } from '@angular/core/testing';

export const isIsolated = () => new URLSearchParams(document.location.search).get('spec');
export const unloadFixture = <T>(fixture: ComponentFixture<T>) => fixture.debugElement.nativeElement.style.visibility = 'hidden';
