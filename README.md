# Git User Switch

Manage/Switch/Scan git user, email and signingKey at ease.

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
  -h, --help     Display help for command
  -i, --info     Show current git user
  -s, --switch   Switch git user
  -c, --create   Create a new git user
  -S, --scan     Scan all git repo in current directory, and show the git user of each repo
```

### Troubleshoot

In case this messes up any of your git configs because of bad input.
Just edit:

_Global_ : `~/.gitconfig`
_Local Project_ : `project/.git/config`

```
[user]
	email = geongeorgexyz@gmail.com
	name = Geon George
```

You can additionally reset the cli data store by running:

```sh
git-user -r
```
