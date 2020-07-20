import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo, Icon } from '../repo.interface';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

    repos: Repo[];
    icons: Icon[] = [
        {
            language: 'JavaScript',
            class: 'fa-js-square',
            color: 'orange',
            selected: false
        },
        {
            language: 'Java',
            class: 'fa-java',
            color: 'blue',
            selected: false
        },
        {
            language: 'HTML',
            class: 'fa-html5',
            color: 'red',
            selected: false
        },
        {
            language: 'TypeScript',
            class: 'fa-angular',
            color: 'red',
            selected: false
        },
        {
            language: 'Vue',
            class: 'fa-vuejs',
            color: 'green',
            selected: false
        },
        {
            language: 'CSS',
            class: 'fa-css3-alt',
            color: 'blue',
            selected: false
        }
    ];
    selectedLanguages: string[];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.selectedLanguages = [];
        this.repos = [];
        this.http.get<Object[]>("https://api.github.com/users/AustinRichburg/repos").subscribe(
            (repos) => { this.repos = this.handleRepos(repos) }
        );
    }

    handleRepos(repos: Object[]) : Repo[] {
        return repos.map(
            (repo: Repo) => {
                console.log(repo)
                let created_at = new Date(Date.parse(repo.created_at)).toLocaleDateString();
                let updated_at = new Date(Date.parse(repo.updated_at)).toLocaleDateString();
                return {
                    name: repo.name,
                    description: repo.description,
                    created_at: created_at,
                    updated_at: updated_at,
                    language: repo.language,
                    html_url: repo.html_url
                }
            }).sort(
                (a: Repo, b: Repo) => { return Date.parse(b.updated_at) - Date.parse(a.updated_at) }
            );
    }

    filterLanguage(language: string) : void {
        let i = this.selectedLanguages.indexOf(language);
        if (i >= 0) {
            this.selectedLanguages.splice(i, 1);
        } else {
            this.selectedLanguages.push(language);
        }
    }

    getIconClass(language: string) : string {
        return this.icons.find(icon => icon.language === language).class;
    }

    openRepo(url: string) : void {
        window.location.href = url;
    }

}
