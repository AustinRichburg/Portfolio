import { Pipe, PipeTransform } from '@angular/core';
import { Repo } from './repo.interface';

@Pipe({
    name: 'language',
    pure: false
})
export class LanguagePipe implements PipeTransform {

    transform(repos: Repo[], languages: string[]) : any {
        if (!repos) return;
        if (languages.length === 0) {
            return repos;
        }
        return repos.filter(repo => languages.indexOf(repo.language) >= 0);
    }
}
