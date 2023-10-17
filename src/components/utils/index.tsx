import { MenuItem, Option, FormControlItem } from "./types";


export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "category",
    label: "Category",
    path: "/category",
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/blogs",
  },
  {
    id: "search",
    label: "Search",
    path: "/search",
  },
];

export const categories: Option[] = [
  {
    value: "psychology",
    label: "Psychology",
  },
  {
    value: "philosophy",
    label: "Philosophy",
  },
  {
    value: "creativity",
    label: "Creativity",
  },
  {
    value: "news",
    label: "NEWS",
  },
  {
    value: "religion",
    label: "Religion",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "science",
    label: "Science",
  },
];

export const formControls: FormControlItem[] = [
  {
    id: "title",
    label: "Title",
    placeholder: "Enter Blog Title",
    type: "text",
    component: "input",
    options: [],
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Enter Blog Description",
    type: "text",
    component: "textarea",
    options: [],
  },
  {
    id: "category",
    label: "Category",
    placeholder: "Choose Blog Category",
    type: "",
    component: "select",
    options: categories,
  },
];


export const firebaseConfig = {
  apiKey: "AIzaSyDD9adqiunPpTWY0yN4JVQYbRhLoMNsvMU",
  authDomain: "wbblog-mine-2023.firebaseapp.com",
  projectId: "wbblog-mine-2023",
  storageBucket: "wbblog-mine-2023.appspot.com",
  messagingSenderId: "771878105555",
  appId: "1:771878105555:web:c0d90c569930a880843f26",
  measurementId: "G-ZJKZESKJ85"
};

export const initialBlogFormData ={
  title: '',
  description: '',
  image: '',
  category : '',
}

