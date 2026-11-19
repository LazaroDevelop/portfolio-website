import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { CONTENT_REPOSITORY, StaticContentRepository } from '../../core/data';
import { ProjectDetailPage } from './project-detail.page';

describe('ProjectDetailPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectDetailPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: CONTENT_REPOSITORY, useClass: StaticContentRepository },
      ],
    });
  });

  it('renders the project for a known slug', async () => {
    const fixture = TestBed.createComponent(ProjectDetailPage);
    fixture.componentRef.setInput('slug', 'rag-ai-assistant');
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')).toBeTruthy();
    expect(el.querySelector('a[href*="chat-assitant-spring-ai"]')).toBeTruthy();
  });

  it('redirects home for an unknown slug', async () => {
    const navigate = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
    const fixture = TestBed.createComponent(ProjectDetailPage);
    fixture.componentRef.setInput('slug', 'does-not-exist');
    await fixture.whenStable();
    expect(navigate).toHaveBeenCalledWith(['/']);
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')).toBeNull();
  });
});
