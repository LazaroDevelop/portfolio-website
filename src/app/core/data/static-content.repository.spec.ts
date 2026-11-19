import { firstValueFrom } from 'rxjs';
import { StaticContentRepository } from './static-content.repository';

describe('StaticContentRepository', () => {
  const repo = new StaticContentRepository();

  it('finds a project by slug and returns undefined for unknown slugs', async () => {
    const projects = await firstValueFrom(repo.getProjects());
    expect(projects.length).toBeGreaterThan(0);

    const first = await firstValueFrom(repo.getProject(projects[0].slug));
    expect(first).toBe(projects[0]);
    expect(await firstValueFrom(repo.getProject('nope'))).toBeUndefined();
  });

  it('has unique project slugs and both languages for every text', async () => {
    const projects = await firstValueFrom(repo.getProjects());
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of projects) {
      for (const text of [p.name, p.tagline, p.overview, ...p.keyPoints]) {
        expect(text.es).withContext(p.slug).toBeTruthy();
        expect(text.en).withContext(p.slug).toBeTruthy();
      }
    }
  });
});
