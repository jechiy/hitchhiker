---
title: How I built this thing (Part 2/4)
subtitle: Using different powers from different worlds
cover: /assets/images/covers/space.jpg
tags:
    - Stories
    - Inspiration
use:
    - posts
---

>When I go to the sea I always go as a simple sailor and never as a passenger. Why should I pay when I can get paid for my work?

That was **Ishmael** from **Moby dick**, This quote always comes to my mind when I thought of creating my own blog using Platforms like Wordpress or something similar, instead of using a Static site generator (SSG). Don't get me wrong! I'm not saying that you should use SSG on all of your projects! what I'm saying is a SSG fits the best with my current needs. Which is creating a technical blog.

I'm a developer with technical background, who wants to start blogging and I don't want something that hides the technical details behind some UIs that do things that I'm familiar with, I'm a sailor, so why should I be a passenger and pay with my time to learn another way to do things that I already know?

In [the first part](#) of this series I talked about the inspiration and how I created the design of this blog, in this second Part I'll talk about how I used [Sculpin]() to implement this blog and [Gulp]() to automatize some recurrent tasks. Unlike the first part this entry can be a guide to walk you through creating your own blog.

In [the first part](#) of this series I talked about the inspiration and how I created the design of this blog, in the second and third part we will see how to use [Sculpin]() to create a fully functional blog and finally in the fourth part we will tackle automatizing all the process with [Gulp]() from managing the assets to pushing to github pages.

Note: I didn't wanted to tackle the proccess of building my own blog since it contains unnecessary information for a starter, but don't worry what I'm describing in this series is a simplified version of my blog nevertheless the code of my Blog is [available in github](#).

# SSG 101

### Overview

Static web generators are not boring as they might look, containing the label **static** on it doesn't mean that you have to leave the comfortable wysiwyg and go to something more annoying and get your hands dirty with plain HTML,  they offer a great alternative which is writing your articles in a lightweight markup language such Markdown or Textile, that get transformed into HTML and let you focus on the content, not the tool.

It can be used not only for blogging, but also for: Personal websites, Portfolio, Documentation you name it, the only limitation is your imagination!

### Technical details

Most of the SSGs work the following way, with some differences.

// Put the schema here

### Why

- Secure, since there is no code that get executed, no database.
- Hight performance.
- No expensive internal execution, since they're simple HTML pages.
- No complicated setup or dependencies.
- The articles are in plain text which make them easily versioned using a version control system.

### What about Sculpin

All what we seen above can be applied to [Sculpin ](#), it's whiten in PHP, and it supports **Markdown files** and **Twig templates**.

That's all what you need to know about SSGs, Let's start building the thing.

### Download and Install Sculpin

#### *NIX systems

You can place this file anywhere you wish and make it executable and invoke it without **PHP**.

You can run these commands to easily access **Sculpin** from anywhere on your system:

``` .language-bash
curl -O https://download.sculpin.io/sculpin.phar
chmod +x sculpin.phar
mv sculpin.phar ~/bin/sculpin
```

### Starting point

As I explained earlier SSGs are not limited to blogging only and so do Sculpin, It has a lot of features built-in for blogs.

In the official documentation they recommend using a [Starter kit](https://github.com/sculpin/sculpin-blog-skeleton.git) to get a blog skeleton, which is a good start, but for me, personally, that really get me off the rails, since it contains some advanced features that I didn't wanted to look at first, which made things complex for me. That's why I was obliged to read community projects and jump from one to another in order to understand certain features. the core team themselves are recommending this and they're doing their best to improve the documentation. 

Meanwhile I decided to create a lightweight, minimal Blog skeleton to help you speed up the process of creating you own blog and more importantly understand the main features of Sculpin.

In addition to what Sculpin offers the repo alose contains the following features:

- Responsive, Minimal design (Thanks to [Jay-X](#)).
- [Prims.js](http://prismjs.com/) as a syntax Highlighter
- [Disqus](http://disqus.com) Integration for commenting fonctinalities.
- Google Analytics integration.

Start by cloning the repo from Github.

``` .language-bash
git clone https://github.com/kronik3r/minimal-sculpin-blog-skeleton.git blog-from-future
cd blog-from-future
```

Now let's **generate** the static files, **lunch** the PHP server & **watch** files for changes and then do automatic re-generation.

``` .language-bash
sculpin generate --server --watch
```

Navigate to [localhost:8000](http://localhost:8000) in order to see the blog.

**PS:** I left you a message there from your future self ;).

Let's create our first article, first you need to create a new Markdown file within **source/_posts** folder and then add the the following content:

``` .language-markdown
---
title: Message from the past.
categories:
    - Present
    - Wins
use:
    - posts
---

# Hi My future self! I won't let you down, count on me.
```

And save it under the name: **2015-03-25-message-from-the-past.md**

Navigate again to [localhost:8000](http://localhost:8000) and you will see your article on the top.

Congratulation fellow developer you've just created your first article using Sculpin.

**Magic! isn't it?**

Now let me explain to you what just happend! **NERLY** every file within a Sculpin project contains two parts:

``` .language-yaml
---
title: Message from the past.
categories:
    - Present
    - Wins
use:
    - posts
---
```

This one is called the *Frontmater*, which is a [YAML](http://en.wikipedia.org/wiki/YAML) content.

and the second part is the content of the file, in our case it's a standard markdown text.

``` .language-markdown
# Hi My future self! I won't let down, count on me.
```

What happened is that Sculpin took our file and based on informations contained in the **Frontmater** and some other things(that I'll explain later), **it** made some transformation to the file (in our case convert Markdown to HTML) then merge it to a template file that contains a header and a footer and finally put the result into a static HTML file.

To illustration the process here's a schema.

// Put the schema here!

Now let's see the files structure:

// Put the files structure image!

There are some other folders and files too that I choose to hide for the sake of clarity. let's focus only on those presented on the above schema, since they are the foundation.

**app/config:** As it name tells this folder contains all config variables for instance: **Base URL** of the website, your **Disqus** user name, etc...

**source/_posts:** This directory will be our most used one, it contains the markdown files of our articles.

**source/_views:** Remember those template files, evoked earlier, they live in here.

Now let's dig into the generation process, Sculpin take all the files within the **source** directory (recursively), except for some folders that we are going to see later, then do the same thing as for the article file. Finally the result is saved in the **out_{environment}** directory depending on your environment. You can easily specify your environment as follow **--env={environment}** when , the default environment is **dev**. However one thing to notice here, Sculpin ignore some files and don't apply the described process to them like *CSS*, *JS*, *images* files (which the case for the **app/source/assets** folder), it simply takes them and copy them (conserving their original file hierarchy) into the output folder.

Ok, enough theory! To illustrate the process I'm going to take a file and explain how it get transformed to the final result!

So let's take a look at index.twig:

```.language-twig
---
layout: default
use:
    - posts
---
{% verbatim %}{% block content %}
    <div id="home" class="page-content wc-container">
        <div class="posts">
            {% for post in data.posts %}
                <div class="post">
                    <h3 class="post-title">
                        <a href="{{ site.url }}{{ post.url }}">
                            {{ post.title }}
                        </a>
                    </h3>

                    <p class="post-meta">
                        <span>
                            {% for category in post.categories %}
                                <span class="post-category">{{ category }}</span>
                            {% endfor %}
                        </span> |
                        <span class="post-date">
                            {{ post.date|date('d F o') }}
                        </span>
                    </p>

                    <p>
                        {{ post.blocks.content|raw }}
                    </p>
                </div>
            {% endfor %}
        </div>
    </div>
{% endblock %}{% endverbatim %}
```

So here, Sculpin based upon the information of the Frontmater which are:

- **Layout:** Which is the name of the tamplate for the current file, which are all stored within the **_views** folder, so if you specify a name in this property make sure that there's a file with the same name in that folder.


- **Use:** Sculpin gives you access to a variety of information that you can exploit within your files, templates. For instance you can use **posts_categories**, **posts_tags**, **posts** respectively for categories, tags and entries.

Note: Notice that the frontmater can be also used to pass variables to the template. like custom page title, name of the menu entry to mark as active, etc...

I'll show you how to do that later.

Now let's move on the content, that's a twig content, first take a look at the [Twig documentation](http://twig.sensiolabs.org/documentation) for a better understanding of the different components of the library.

In our case we have a **block** named **content** which contains the content of this current page that gonna be transmitted to the template to be placed within the appropriate place.



Withing every page you have access to the following variables:

**Data:** Contains all variables that you mentioned in the **use** section of the Frontmater, in our case it contains **posts**.

**Page:** Contains **url** with the page url, **blocks** with the twig blocks within the page and every custom variable in there in out case we have: **layout**, **nav** to help use mark the current page in the menu.

**Site:** Contains config variables, that comes fro the config file located at **app/config/sculpin_kernel.yml**.

so let's see the code of the content. we iterate over the Posts(**data.posts**)
for each post we have access to the following variables:

- **Url:** Url of the blog post, this one can be customized in the configuration, take look at the Doc [here](https://sculpin.io/documentation/content-types/posts/) for more information on that.
- **Date:** A timestamp value of the published date. the value is taken from the file name.
- **Title:** The title of the article
- **Blocks:** Contains the actual content of the article in HTML. Notice the
[row filter](http://twig.sensiolabs.org/doc/filters/raw.html) `{% verbatim %}{{ post.blocks.content|raw }}{% endverbatim %}` in order to not escaped the content

You didn't notice something? the same variables contained in a **post** are the same available in **page** but with additional variables, well that's because of every **post file** within the _posts directory is actual a normal **Sculpin Page** but as Sculpin has a built-in support for Blog functionalities, that's why we have access to those variables out of the box.

Up to now we've seen the construction of a page, now let's move on the how it content is going to be transited to the layout page.

Here's the layout page (**App/source/_views/default.twig**)



``` .language-twig
{% verbatim %}<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {% include 'meta_info.twig' %}

        {% include 'css.twig' %}
    </head>

    <body class="theme-base-01">
        {% include 'header.twig' %}

        {% block content_wrapper %}{% block content %}{% endblock %}{% endblock %}

        {% include 'footer.twig' %}

        {% include 'js.twig' %}
    </body>
</html>{% endverbatim %}
```

All the included files lives within the **app/source/_views** folder. so before include any file make sure its in the right place.

Before we jump in, let's take a look at **app/source/_partials/layout/header.twig**:

```.language-twig
{% verbatim %}<header class="main-header">
    <div class="wc-container">
        <h1><a href="{{ site.url }}">I'm Jackson</a></h1>
        <h2>The mascot for Sculpin and this is my blog</h2>
        <ul>
            <li>
                <a href="{{ site.url }}">Home ({{ data.posts|length }})</a>
            </li>
            <li>
                <a href="{{ site.url }}/about">About</a>
            </li>
        </ul>
    </div>
</header>{% endverbatim %}
```

Notice here the use of `{% verbatim %}{{ data.posts|length }}{% endverbatim %}`, remember the **data** variable contains all the entries mentioned in the **use** section of the **Frontmater**, well the variable can be accessible even in the layout. So the trick here is if the layout needs a variable that must be cited within the **use** section, even if the page itself don't use it you have to reference it anyway.

The interesting part here is the following code:

```.language-twig
{% verbatim %}{% block content_wrapper %}
    {% block content %}{% endblock %}
{% endblock %}{% endverbatim %}
```

Here we define where the content of the pages gonna be shown, you may ask why do we have two blocks **content** and **content_wrapper**. Well theoretically **content** in enough but we add the other one to handle a special case with the blog posts, I'll come to that in the next section.


And finally the content get generate into an HTML file, notice that the file is placed within a folder named with the same name of our original file, eg: original file **about.md** will be **about/index.html** just in order to make the url looks prety.


The blog posts are a slightly different from normal files in the sense that they have some default behavior like

they have a default **layout** which is **post** that's why if you take a look in the **_views** folder you gonna find a **post.twig** file.



So we could do the following to the **Post** template

```.language-twig
{% verbatim %}{% extends "default" %}{% endverbatim %}
```

Every post file contains the frontmater and the Markdown markup that gets transformed to HTML and get wrapped up in a `{% verbatim %}{% block content %}{% endverbatim %}` and then get server automatically to the layout. that's good but that gonna lead us to a other problem, we don't have much control on the display of the **post details page** what if we want to show the tile or the date of publishing etc..., we can't because the content is directly served to the template leaving us with not choice.

Once could say that we can override the `{% verbatim %}{% block content %}{% endverbatim %}` so we can show additional data, we can do as follow:

```.language-twig
{% verbatim %}{% extends "default" %}

{% block content %}
    <div class="page-content wc-container">
        <div class="post">
            <h1>{{ page.title }}</h1>

            <p class="post-meta">
                <span>
                    {% for category in page.categories %}
                        <span class="post-category">{{ category }}</span>
                    {% endfor %}
                </span> |
                <span class="post-date">
                    {{ page.date|date('d F o') }}
                </span>
            </p>

            <div class="post">
                {{ page.blocks.content|raw }}
            </div>
        </div>

        {% include 'related.twig' %}
    </div>
{% endblock %}{% endverbatim %}
```

Good we have a custom template for our posts, but I'm afraid that our above code will not work simply because the result **block** from our post markdown file is going to override what we put.

Remember when I told you that we have two **blocks** within our **default** template **content** and **content_wrapper** and how that was to handle a specific case, well that was for our current problem so to fix the issue all what we have to do it to change `{% verbatim %}{% block content %}{% endverbatim %}` to `{% verbatim %}{% block content_wrapper %}{% endverbatim %}` in our **Post** template.

Note: The same technique was used for the **Page** type, give the file **app/source/about.md** a look and you will understand.


Most of the time when you are going to need some advanced manipulations in the view, go look how to do it using [Twig](#). For instance let's say the you want to get the latest post of your blog, one could go search if Sculpin got something that do that, but you can achieve the wanted result by just using the [First](#) filter like so:

```.language-twig
{% verbatim %}{% data.post|first %}{% endverbatim %}
```

So my point is, let [Twig](#) force be with you :).

Check the file **source/_partials/related.twig** to see the implementation of **Related article** functionality.

## Config variables

Configuration files come handy when you wants to re-use a value across your website without (khtara9) the DRY principal, they can be access from the globale **site** variable, can be also used as a flag to activate or dis activate features on the fly. Notice how I used the **show_related** flag in **source/partials/related.twig** to enable/disable the show related articles functionality.

```.language-twig
{% verbatim %}{% if site.show_related %}
    <div class="related">
        {# The rest of the code here ..... #}
    </div>
{% endif %}{% endverbatim %}
```

One final though before I close this section, you have access to a special variable called **env** which give you access to the name of the current environment, I used it in **source/partials/google-analytics.twig** to allow tracking only on the production environment. notice the **tracking_id** variable too.

```.language-twig
{% verbatim %}{% if site.env == 'prod' %}
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','{{ site.tracking_id }}');ga('send','pageview');
    </script>
{% endif %}{% endverbatim %}
```

And yeah! that's pretty much it! Now you have a fonctional blog skeleton ready for production with the essential knowledge about Sculpin that allows you to extend the skeleton, customize it and even build your blog from scratch.

# Final closing thoughts

Now you have your **output_prod** folder ready for deployment. One problem that I found while working with Sculpin is the ability to push my generated files to Github pages automatilly unlike Jekyyl which is fully supported.

In the next part I'll show you how to use Gulp to manage your assets and most importantly, push your code to your github page right from your Sculpin project.