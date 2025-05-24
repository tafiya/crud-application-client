export interface Project {
  _id: string;
  title: string;
  description: string;
  project: string;
  imgURL: string;
  status: 'draft' | 'published';
}
