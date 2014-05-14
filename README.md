goodfest-2014
=============

Front-end code for the GoodFest 2014 website

Getting Started
---------------

### Prerequisites
The following software must be installed:

1. [Git](http://git-scm.com/)
3. [Node.js](http://nodejs.org/)
4. *Optional*: A Git GUI (I recommend [SourceTree](http://www.sourcetreeapp.com/) on Mac/Windows and [SmartGit](http://www.syntevo.com/smartgithg/) on Linux)

A basic understanding of Git is also assumed (and a basic understanding of the Git GUI if being used). There are plenty of informational articles/videos available online to learn the barebones.

### Clone repository
Clone the repository into any folder you deem fit by executing the following in the command-prompt:

    git clone https://github.com/GoodrickeJCRC/goodfest-2014.git
    cd goodfest-2014

### Setup front-end
Install the node.js requirements with:

    npm install

Now compile the JavaScript and stylesheets with:

    grunt

#### Live reloading
JavaScript/Less files will be recompiled on-the-fly as you modify them if you run the following and leave it in the background:

    grunt watch

You can also download the [LiveReload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions) to automatically reload the page when you make changes, too.

Development Server
------------------

After the front-end has been compiled, the node.js development server can be ran with:

    node server.js

The server will listen on `localhost:8080`.
