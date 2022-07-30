import { TResponse } from "@/api/apiTypes";

export interface PostSearch {
  search: string;
  page: number;

  descriptionFt: string;
  hashtagsFt: string;
  photoDtFromFt: string;
  photoDtUntilFt: string;
  createdAtFromFt: string;
  createdAtUntilFt: string;
  updatedAtFromFt: string;
  updatedAtUntilFt: string;
  nameFt: string;
  usernameFt: string;
  
  sort: Record<string, string>[];
  // descriptionSt: string;
  // hashtagsSt: string;
  // photoDatetimeSt: string;
  // createdAtSt: string;
  // updatedAtSt: string;
  // user_nameSt: string;
  // user_usernameSt: string;
  //[key: string]: string | number;
}

export interface PostApiSearch {
  q?: string;
  
  _page?: number;  
  
  _ft?: number;
  description?: string;
  hashtags?: string;
  photoDtFrom?: string;
  photoDtUntil?: string;
  createdAtFrom?: string;
  createdAtUntil?: string;
  updatedAtFrom?: string;
  updatedAtUntil?: string;
  user_name?: string;
  user_username?: string;
  
  _sort?: string;
  _order?: string;
}

interface PostList {
  id: number;
  photo: string;
  description: string;
  hashtags: string;
  createdAt: string;
  updatedAt: string;
  photoDatetime: string;
  user: {
    name: string;
    photo: string;
    username: string;
  }
}

export interface PostsList {
  total: number;
  posts: PostList[];
}

export type PostsListResponse = TResponse<PostsList>
export type PostListArrayResponse = TResponse<PostList[]>