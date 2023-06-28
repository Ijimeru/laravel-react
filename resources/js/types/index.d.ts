export interface User {
    id: number;
    name: string;
    email: string;
    roles:{
        role:string;
    }[];
    email_verified_at: string;
}
export interface ChirpType {
    id: number;
    message: string;
    created_at: string;
    user: { name: string; id: number };
    updated_at: string;
}

export interface ConstantType {
    text:string;
    btext:string;
    color:string;
}

export interface CategoryType {
    id: number;
    name: string;
    posts?: PostType[];
    books?: BookType[];
}

export interface BookType {
    id: number;
    categories: CategoryType[];
    title: string;
    cover: string;
    author: string;
    file: string;
    tahun: string;
    created_at: string;
    updated_at: string;
}

export interface PostType {
    id: number;
    categories: CategoryType[];
    author: { name: string };
    image: string;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: { query: { page: string; category: string } };
};
