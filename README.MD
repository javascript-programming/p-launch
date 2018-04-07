# Pensioen.NU (Pension.now) || Blockchaingers 2018

[![BCH compliance](https://bettercodehub.com/edge/badge/Blockchaingers/pensioen.nu?branch=master&token=a415fea33d78e3dc5a4a7b8cd285a8ce9493d8c0)](https://bettercodehub.com/)

## Summary

## Technology

## Getting Started

```console
git clone https://github.com/Blockchaingers/pensioen.nu.git
```

### Prerequisites

* NodeJs
* Yarn / NPM
* [TruffleFramework](http://truffleframework.com/)
* [Ganache](http://truffleframework.com/ganache/)
  > Running Test blockchain

## Smart Contracts

### Install

#### 1) Install [TruffleFramework](http://truffleframework.com/)

```
npm install -g truffle
```

#### 2) Install project dependencies

```console
yarn install
```

#### 3) Install ganache

> Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.

Download: http://truffleframework.com/ganache/

##### OR

Use the Ganache-CLI

```console
npm install -g ganache-cli
```

## Build

Do this everytime a contract is changed.

### 1) Build Truffle

```
truffle compile
```

### 2) Deploy

N.B. Have `Ganache` running before deploying

* Either by program or cli

```
truffle deploy
# user --reset if no changes are deployed
truffle deploy --reset
```

OR Combine it:

```console
yarn truffle:compile
```

## Pension APP (Ionic)

### Install

1.  Go to `participant-app`

```console
$ participant-app/yarn install
```

### Start App

```console
yarn ionic:build
```

## Test
