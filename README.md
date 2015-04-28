# Hitchhiker's blog on Web Development

It's a blog mainly about PHP(Laravel), Js(Angular), CSS & Life.

Built by [@thekroniker](https://twitter.com/thekroniker).

Visit the website to get more info: [http://hitchhiker.ma](http://hitchhiker.ma/).

From Morocco with love, Hosted in [Guithub](https://github.com/kronik3r/kronik3r.github.io), Powered by [Sculpin](http://sculpin.io).

## Contributing

If you want to run the website locally to preview your post, of if you want to contribute with code and new features, check the following section on how to install Sculpin.

### Download and Install Sculpin

#### *NIX systems

First download the **PHAR** and then make is executable.

```
curl -O https://download.sculpin.io/sculpin.phar
chmod +x sculpin.phar
mv sculpin.phar ~/bin/sculpin
```

It's practical to be able to use Sculpin from anywhere in your system. In order to do that let's move Sculpin to your bin directory.

```
mv sculpin.phar ~/bin/sculpin
```

#### Windows

You can download the **PHAR** manually from [here](https://download.sculpin.io/sculpin.phar) and put it wherever you want then create a **sculpin.bat** file with the following content and add it to your **PATH**:

```
@ECHO OFF
php "%~dp0sculpin" %*
```


### Build

You need to have [Node.js](https://nodejs.org/) & [Gulp](http://gulpjs.com/) installed on your machine.

then simply run:

```
gulp
```