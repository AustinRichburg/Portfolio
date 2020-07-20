export interface Repo {
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
    language: string
    html_url: string
}

export interface Icon {
    language: string,
    class: string,
    color: string,
    selected: boolean
}