export interface User {
    id: number;
    name: string;
    email: string;
    roles: {
        role: string;
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
    text: string;
    btext: string;
    type: string;
}

export interface CategoryType {
    id: number;
    name: string;
    meta_category_id: number;
    posts?: PostType[];
    books?: BookType[];
}

export interface BookType {
    id: number;
    categories: CategoryType[];
    title: string;
    author: string;
    file: string;
    tahun: string;
    penerbit: string;
    created_at: string;
    updated_at: string;
}
export interface content {
    content: string;
}

export interface OrganizationTree {
    name?: string;
    jabatan?: string;
    className?: string;
    children?: OrganizationTree[];
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
    status: string;
    views: number;
    published_at: string;
    created_at: string;
    updated_at: string;
}
export interface flash {
    message: string;
    type: string;
}

export interface CommentType {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    post_id: number;
    user_id: number;
    user: User;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    book: BookType;
    ziggy: { query: { page: string; category: string } };
    flash: flash;
};
