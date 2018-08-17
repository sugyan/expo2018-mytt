# tif2018-mytt

https://tif2018-mytt.herokuapp.com/

```
$ heroku buildpacks:add heroku/nodejs
$ heroku buildpacks:add heroku/ruby
$ heroku addons:create heroku-redis:hobby-dev
$ heroku addons:create scheduler:standard
$ heroku config:set TWITTER_CONSUMER_KEY=********
$ heroku config:set TWITTER_CONSUMER_SECRET=********
$ heroku config:set TWITTER_ACCESS_TOKEN=********
$ heroku config:set TWITTER_ACCESS_TOKEN_SECRET=********
```
