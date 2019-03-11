# Redackt | [A Slack Skin for Reddit](https://romanparkhomenko.com/redackt)
---
## Hey Slackers!
Inspired by [pcottle's MSOutlookit](https://github.com/pcottle/MSOutlookit), I decided to build my own Slack-like skin for Reddit. Now you can pretend to be messaging your colleagues, while actually browsing your favorite subreddit. This was my first big project in React, but it was a lot of fun and taught me a lot. I'm also making it completely open source so you guys can help me make this a truly wonderful time-waster! I've listed a problem and TO-DO section below if there's anything in particular you want to tackle.
Disclaimer: Obviously, I don't own Reddit or Slack, just wanted to make something cool combining the two!

---
### Features:
I wanted to bring in as much functionality as possible, while staying true to the features that Slack and Reddit offer, such as:
- **Dark Mode** - Click the gear wheel icon to turn on dark mode.
- **Threads** - Click the title of any post, or the thread button to open up the comments for that post.
- **Sorting** - Sort posts by top, hot, new, controversial, and rising by clicking the dropdown in the header. 
- **Add/Remove Subreddits** - Click on the plus sign next to channels, or click in the "Add Sub" box, type in a subreddit, and hit enter.
- **Load More** - To not overload the API, I've limited the default posts to 10 posts, but if you press the plus button at the bottom, you can load more posts. 
- **Search** - It doesn't give you a lot right now, but you can search posts in the subreddit you're in.
- **Preferences** - If you set Dark Mode or add/remove subs, you'll get a small cookie to save your settings so your preferences are there when you come back. 
- **Likes/Gildings** - See how many likes and awards posts and comments got with the emojis underneath.
---
### Working on the project:
Just clone the project and run `yarn start`! I'll approve any PR's that seem appropriate and push them to the server!

---
### Problems / To-Do List:
- **Missing Comments** - When opening the thread, you'll sometimes notice that the bottom one is missing a comment. This has to do with the response you get from Reddit, but I'm not sure how to fix it.
- **Lazy Loader** - The lazy loader for media elements seems a bit too lazy at times? Especially on mobile. It could be my server, but I could be missing something.  
- **Image sizes** - The JSON response I get from Reddit provides URL's for image resolutions, but they're not accessible for some reason. This makes certain image files way too large and makes the app seem laggy. 
- **Weird click event and style bugs** - Sometimes weird stuff happens. Like when you click to open a thread twice, it can make the search bar disappear.
- **"User" thumbnails** - I'm randomizing user thumbnails, but don't particularly like how they load differently every time you open a thread. 

I'd like to add:
- **Search Improvements** - Reddit search needs some work in general, but my version of it needs some UI improvements at least.
- **Image Expander** - The way images expand right now doesn't pull any additional info from the message, that'd be cool to add.
- **An actual backend** - I'd like to make this a fully functioning app with the ability to post comments, integrate OAuth to login, and use a DB to store preferences. That's a lot though, so figured I'd start with what I have.
- **Star function** - It'd be cool to have a "starred" list for your favorite subs.
- **Refactoring** - Being my first React project, I'm sure I could do things better and cleaner.
- **More media formas** - Right now, an image will only generate if the response contains .PNG or .JPG. GIFS are loaded via a video tag. I'm certain there's better ways to get more media types in.
---
### Collaboration
I've never done this before, so I'm not entirely sure what collaboration looks like or is supposed to look like. You can fork the project or I guess hit me up if you want to join the slacker cause! Contact me at rsparkhomenko@gmail.com or message u/RusskiRoman on reddit with any questions!

---
Shameful Plug: 
If this project helps you "slack" off at work, teaches you something, or you appreciate crappy code and want to support this project: You can buy me a cup of coffee or help get me out of soul-crushing student debt here: 
Venmo: @Roman-Parkhomenko
CashApp: $RomanParkhomenko
