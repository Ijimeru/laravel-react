export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
export interface ChirpType {
    id: number;
    message: string;
    created_at: string;
    user: { name: string; id: number };
    updated_at: string;
}

export interface CategoryType {
    id: number;
    name: string;
    posts: PostType[];
}

export interface PostType {
    id: number;
    categories: CategoryType[];
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
    ziggy: { query: { page: string } };
};
