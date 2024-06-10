# JSOFF

## What is JSOFF?
It's a chrome extension for toggling javascript off/on for whatever domain you're currently on.

## Why does JSOFF exist?
The extension I was using got hijacked and infected with malware so I made my own to replace it. Some backstory here:
https://www.reddit.com/r/chrome_extensions/comments/1bqdfj6/disable_javascript_extension_has_malware/

## How does JSOFF work?
It twiddles the javascript settings native to the browser.

These are the same settings you can inspect and change manually by going here:

chrome://settings/content/javascript

These settings apply on a domain basis, not on individual paths/pages under a domain. That was good enough control for me and kept the code for the extension to a minimum.

So if you turn off javascript when you're on `analytics.google.com` it only applies there and not at `google.com`. If you turn it off at `example.com/pages/1` then it will be off at `example.com/pages/2` and just `example.com` as well.

Javascript is enabled to start and you can click on the extension icon to disable it after the first time you visit. This extension doesn't have a setting to disable javascript by default and click to allow. Check out NoScript if you're looking for something like that.
