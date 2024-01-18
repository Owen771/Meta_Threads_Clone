## Getting Started

First, clone this project
```bash
git clone ...
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Threads!

---

Note to me
- tailwind.config.js, globals.css are provided by the course
- Should comment (as it's also a thread) be clean up once the original thread is deleted? (even tho now it does not have the delete functionality yet)
- user2: pobije2430@ikuromi.com

### Auth

- Clerk: a 3rd party provided auth component (login with Github, Google, Email etc.) 

### Layout

- Added topbar
- Sidebar for nav to various page 
    - Topbar (Logo, Your account)
    - Left Sidebar for web, BottomBar for mobile / tablet
        - How come always one of them is showing (i.e BottomBar wont show when LeftSidebar showed, vice versa)
    - Right sidebar (Suggested communities, Suggested users)

### Onboarding 

- [shadcn/ui](https://ui.shadcn.com/docs/components/form): a 3rd party that provided component
    - Generated all codes on /components/ui/
- [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference (no idea what this for)
- Onboarding page (a form) frontend done
- Onboarding page (a form) backend done (uploadthing api + mongoDB)

### Thread (post)

- A textarea for user to create thread post
- Home page fetch thread

#### Thread detail page

- Original post
- other user can put comment on original post
- other user can put comment on other comment

![Alt text](doc_img/Thread_detail_page.png)

### Profile

- User can view its profile as well as others
    - User profile
    - Tabs (using shadcn-ui)
    - If looking at your own profile, you can delete Threads you post

