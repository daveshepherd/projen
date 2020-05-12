import { FileBase } from './file';
import { GENERATION_DISCLAIMER } from './common';
import { Project } from './project';

export class IgnoreFile extends FileBase {
  private readonly excludes = new Array<string>();
  private readonly includes = new Array<string>();

  constructor(project: Project, filePath: string) {
    super(project, filePath, { editGitignore: filePath !== '.gitignore' });
  }

  public exclude(...patterns: string[]) {
    this.excludes.push(...patterns);
  }

  public include(...patterns: string[]) {
    this.includes.push(...patterns);
  }

  protected get data(): string {
    return [
      `# ${GENERATION_DISCLAIMER}`,
      ...this.excludes,

      // includes must follow includes
      ...this.includes.map(x => `!${x}`),
    ].join('\n');
  }
}