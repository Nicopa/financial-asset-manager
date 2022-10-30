# Finance Asset Manager

STATUS: under development
VERSION: 0.1.0

This is my personal finance asset manager. Since I started investing in stocks, bonds, funds, and other assets, I've been using spreadsheets to keep track of my investments. Now, with this app, I can control all my trades easier, faster and with better reports.

Since I designed it for my own investments, which are or are located in Brazil, the asset modules, for now, follow the rules and logic of Brazilian legislation.

![Screenshot 1](/docs/web-app/screenshot1.webp)
![Screenshot 2](/docs/web-app/screenshot2.webp)
![Screenshot 3](/docs/web-app/screenshot3.webp)

## Table of contents

1. [Features](#features);
2. [Requirements](#requirements);
3. [How to install](#how-to-install);
4. [Project goals](#project-goals);
5. [Next feature scheduled](#next-feature-scheduled)

## Features

- Cash flow record;
- Tradings record of brazilian stocks, brazilian real estates, CDBs (Certificado de Depósito Bancário - Bankary Deposit Receipt) and BDRs (Brazilian Depositary Receipt). More asset options will come in the next upgrades;
- Asset earnings record;
- Wallet assets and position tracking;
- Asset price update service routine;

## Requirements

- Node.js, version 16.13.0;

### API

- MySQL 8.0;
- MongoDB 5.0;

### Web app

- React 18;

## How to install

1. Download/fork this repository and then follow the instructions below;

### API

1. Run `yarn install` (check if any error messages are displayed);
2. You can run `yarn dev` for development version or `yarn build` and `yarn serve` for production version;

### Web app

1. Run `yarn install` (check if any error messages are displayed);
2. You can run `yarn start` for development version or `yarn build` to generate the production version (then use any server of your preference);

## Project goals

This project was created because, in addition to my desire to have a more personal management system for my investments, I needed to practice some more complex coding patterns, designs and concepts.

So, in this project, I tried to apply, as best as possible, Clean Architecture followed by Event Driven Architecture, TDD (Test Driven Development), CQRS (Command Query Responsibility Segregation), the fundamentals of DDD (Domain Driven Design) and SOLID Principles.

Still, there aren't many business rules implemented in the project at the moment, which would lead to a simpler architecture. But for sure there will be more in the next modules and updates.

## Next feature scheduled

New asset module for trading: investment funds.
