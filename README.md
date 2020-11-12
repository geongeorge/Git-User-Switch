# Git User Switch

Switch git user and email at ease.

<img src="https://thumbs.gfycat.com/OfficialLiveImago-size_restricted.gif">



### Install

```
npm i -g git-user-switch
```

### Usage

```
Usage: git-user [options]

Switch git users quickly. Switches locally by default

Options:
  -V, --version  output the version number
  -g, --global   Switch global git user
  -d, --delete   Delete a git user from the listing
  -r, --reset    Deletes all data and resets
  -h, --help     display help for command
```


### Troubleshoot

In case this messes up any of your git configs because of bad input.
Just edit:

*Global* : `~/.gitconfig`
*Local Project* : `project/.git/config`

```
[user]
	email = geongeorgexyz@gmail.com
	name = Geon George
```

You can additionally reset the cli data store by running:

```sh
git-user -r
```
