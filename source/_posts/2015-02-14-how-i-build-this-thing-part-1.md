---
title: How i build this thing (Part 1/2)
subtitle: Inspiration & Design thoughts
cover: /assets/images/covers/space.jpg
nav: why
tags:
    - Stories
    - Inspiration    
use:
    - posts
---
I'm going to talk about how I built this blog, from the design inspiration to the implementation and also show you how I used PHP & Node.js to make things concrete.

So, shall we begin?

## Inspiration

I was mainly inspired by those dribbble shots by [Piotr Kwiatkowski](https://dribbble.com/p_kwiatkowski):

[![img](/assets/images/resources/article_feed.jpg)](https://dribbble.com/shots/1508050-Article-Feed?list=users&offset=7)

And

[![img](/assets/images/resources/blog.png)](https://dribbble.com/shots/1368779-Blog?list=users&offset=12)

At the time Google had just announced their new framework [Material design](http://www.google.com/design/spec/material-design/introduction.html) that I was highly inspired from, I'll come to that later.

After some tries here's what I've come up with:

![img](/assets/images/resources/sketchs.jpg)

hahaha not so pretty huh!? (Just wait to see the final design! you b#~#~!r!)

The next thing that I thought of, is the standard blog model which is : list of the articles on the home page, a sidebar with tags, categories and a page for the post details. I didn't like this approach for two reasons :

- It's not that fan :p, come on we're not making the next big app! let's experiment and have some fun.
- (The real one) While you're reading an article if you want to see the others you have to come back to the main page to have a bird's eye view.

That's why i focused on the main components of a blog, namely, the list of articles, the article detail page and the filtering. To solve the 'back-to-home-page' problem shown earlier, I've just put all the things in one place! let me explain that: instead of using the sidebar to display non-important information I used it as the main listing of the articles with a nice filter on top of that (I'll show you design right after) while keeping the post detail page on the middle of the focus.

So with that in mind and some tweaking here's the result:

![img](/assets/images/resources/home-page-vf.jpg)

And let's zoom in a little bit to see the filtering on the sidebar:

![img](/assets/images/resources/sidebar-filter.jpg)

I still didn't implement this feature, but I think of a google material design like animation.

And to finish with the sidebar you're going to notice a little button to hide/show the thing in order to give more space for the reader, though I still don't know how the transition is going to feels like. Here's a screenshot: 

![img](/assets/images/resources/menu-hideen-scrolled-down.jpg)

While implementing the sidebar I came across an interesting challenge : what if you have; let's say 5 articles per page, and each one takes 20px of height, a user with a 1024x768 screen resolution will not be able to see the whole list, that's why I'm thinking of calculating the number of articles to show, dynamically, depending on the user's screen resolution.

## Article

There are three important things in here:

First, the cover I liked the idea of the title and subtitle because that gives some details to the user at a glance, then adding the most interesting data which are : Categories and publishing date, thought I still have a design problem, if the cover contains bright colors that, will make reading information difficult, but I'll fix that later.

The second thing is the article content, I've put the basic text components, and here are some screenshots: 

![img](/assets/images/resources/typo.jpg)

Third, this is a technical blog and something very important is missing, a **Syntax Highlighter** I'll talk about that later in the second part, but my main inspiration at that moment were: 

[Aerotwist](http://css-tricks.com/), what I liked the most in that syntax highlighter is the full screen design:

![img](/assets/images/resources/aerotwist-syntax-highlighter.jpg)

[CSS-tricks](http://aerotwist.com/), here the Language-indicator in  the top is just so sexy!

![img](/assets/images/resources/css-tricks-syntax-highlighter.jpg)


## Contact page

I hate long forms and that was my motive to search for something simple and short then I discovered this Codrops [experiment](http://tympanus.net/codrops/2014/07/30/fullscreen-form-interface/) and combine it with their input's design in [here](http://tympanus.net/codrops/2014/04/01/minimal-form-interface/) I've come up with this:

![img](/assets/images/resources/contact-page.jpg)

I've added a little steps-indicator on the top and keeping the same design of the sidebar.

The bad news here is I'm not sure 100% if I'm going to implement this feature to the final version, maybe I'll just put a little pop-up that contains my email or something similar, but let's follow the destiny and see!

## Colors

For colors I just picked what felt fun to me ! There is no theory or science behind :D. I mainly used those two tools to help me choose: [UI-Gradients](http://uigradients.com/) and [Kuler](https://color.adobe.com/explore/newest/?time=all).

## Typography

Again for the typography I chose what I'm comfortable with, I picked [Roboto font](http://en.wikipedia.org/wiki/Roboto) it's a nice font developed by Google and used mainly in all their products and it's free.

## Scrolling-down 

First the idea was to keep my avatar in top when the user scrolls down (you can see that in the shoot with the hidden sidebar), but that felt weird for me to have my face looking at you when you're reading :D  so what I did is to complete remove it and make the menu a little bit smaller, giving more space to the post content.

## Final note

As a final note before jumping to the code. one of the things that I learn from creating this blog is to **don't go look for perfection**, just release the **minimum**, like I said to you a lot of features described in here are not yet implemented! simply because they are not important right now.


## Open Design !

I'm putting the [PSD file](https://drive.google.com/file/d/0B3HYDtNRBG_tVXpxc29VanVOYTA/view?usp=sharing) open source, you can play with it and build your version on top of it. The code source is also available on [Github](https://github.com/kronik3r/hitchhiker), but I'll explain that in detail on the second part of this series.


# What about the code baby ?

Well! when creating a blog there are plenty of tools to choose from, one of the interesting ones are: Blogging platforms and Static site generators (SSG). The second solution felt natural for me, but most importantly, I wanted a customized design so if I used a platform (like Wordpress) i had to deal with  integrating a custom design and that will generate endless problems, sounds like a risky road for someone how wants to release as soon as possible, so I stuck with SSG, again, there are a lot of choices out there, Probably the most popular is [Jekyll](http://jekyllrb.com/), it's an amazing Ruby tool, but since I'm a PHP developer i searched for something written in that language to have more flexibility (Thought i don't have anything against Ruby) I came across [Sculpin](https://sculpin.io/) :

>Sculpin is a **static site generator** written in **PHP**. It converts **Markdown files**, **Twig templates** or **standard HTML** into a **static HTML site** that can be **easily deployed**.

in the second part I'm going to talk in detail on how I used Sculpin to generate the blog and Gulp to automatize things.