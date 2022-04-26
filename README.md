# parcel-reporter-exec

[![Build Status](https://drone.aricodes.net/api/badges/aricodes-oss/parcel-reporter-exec/status.svg)](https://drone.aricodes.net/aricodes-oss/parcel-reporter-exec)

Executes your bundle after building. Useful for NodeJS development, particularly with Express.

## Installation

With `npm`:

```
$ npm install --save-dev parcel-reporter-exec
```

With `yarn`:

```
$ yarn add --dev parcel-reporter-exec
```

## Usage

In the `.parcelrc` file for your project, add this to the list of resolvers. A blank configuration with nothing but this plugin in it would look like:

```json
{
  "extends": "@parcel/config-default",
  "reporters": ["parcel-reporter-exec", "..."]
}
```

Note that the `"..."` entry is literal - that tells Parcel to use the rest of its default reporters there. Without that, your project output will likely be quite strange.

## Example

After adding that to your parcel config, simply run `parcel watch` and your code will execute after every successful build.

## Why?

Parcel is far and away the easiest way to use modern JS syntax, both on the web and in Node. This plugin is to cover for the lack of a `--run` option in the `watch` config, which is (for some reason) still absent after [several years of it being requested](https://github.com/parcel-bundler/parcel/issues/1131).
