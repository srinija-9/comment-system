export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  timestamp: Date;
}

export type SortOption = "newest" | "oldest";
