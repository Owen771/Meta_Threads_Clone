# Meta Threads Clone

## Getting Started

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Threads

# Quick peek on the app

## Thread detail page

- Original post
- other user can put comment on original post
- other user can put comment on other comment

![Thread Detail Page](doc_img/Thread_detail_page.png)

## Profile

- User can view its profile as well as others
    - User profile
    - Using shadcn-ui to impl Tabs (Replies, Tagged not impl)
    - If looking at your own profile, you can delete Threads you post (not impl yet)


## Search

- Can see other users and view its profile


## Activity

- Like a notification tab, where allow you to see when somebody commented on your Thread


## Community

- There has many communities, and admin can give user access to it
![Different Community](doc_img/Community_page.png)

- Once you're the member community, you can read all of the community Threads
![Community Home Page](doc_img/Community_detail_page.png)

- Also can see the member list of the community


## Auth

- Clerk: a 3rd party provided auth component (login with Github, Google, Email etc.) 

