---
title: 'Breaking up our monolithic Vue app with micro frontends'
description: 'Details on how we implemented a micro frontends architecture at JumpCloud'
pubDate: '2025-03-12'
author:
  - name: 'Geordi Dosher'
  - name: 'Brian Simon'
    link: 'https://brianesimon.com/'
---

_Note: This was originally posted on JumpCloud's Engineering Blog [here](https://medium.com/jumpcloud-engineering/breaking-up-our-monolithic-vue-app-with-micro-frontends-2a56c36589f7). I'm republishing this article here for posterity._

Over the last couple years, we’ve been migrating JumpCloud’s admin portal web application to use a micro frontends architecture. This architecture has been a major driver for engineering improvements in our frontend, enabling us to ship code quickly and independently across teams located around the world. In this article, we’ll discuss why we chose to implement micro frontends, the challenges we’ve had to solve for, and what we’ve learned along the way.

## Why Micro Frontends?

In early 2023, we were really feeling constrained by the monolithic architecture of our admin portal Vue app. We were struggling with dependency updates, code ownership, and coordinating deployments with development teams located around the globe. We were tasked with upgrading some ubiquitous dependencies with nontrivial upgrade paths. The upgrade process was daunting, with many breaking changes in both the framework itself and related libraries. Our original upgrade proposal was going to be pretty disruptive to product development and included a multi-month code freeze to tackle these breaking changes. After much discussion, we decided we just didn’t feel comfortable executing this plan: it was just too much work to tackle all at once, with a reasonable chance for unknown unknowns to push it even further off track or cause disruptions to our customers.

Going through this process showed us that we had really hit the end of the road with our current monolithic architecture. We needed an architecture that enabled big dependency upgrades like this so that we could keep our application secure and quickly respond to issues in our toolchain. We needed our engineering teams to be able to own these changes themselves.

We started to envision a better architecture using micro frontends. JumpCloud has a wide range of distinct features and teams working on those features. The current architecture was like a house with no walls; from a tooling perspective there were no boundaries between these distinct parts of the app. If we break out pages and groups of pages into micro frontends, we are creating walls inside our “house” that our tooling could better understand. We would get the following benefits:

- **Incremental dependency upgrades.** Instead of having to upgrade dependencies all at once, we could make major dependency updates one app at a time. Many smaller upgrades are easier to execute vs coordinating on one massive one.
- **Deployment flexibility.** When this was all one app, we had to coordinate deployments across teams around the globe. If something went wrong in one area of the app, all deployments had to stop. In this new architecture, each app can be deployed independently and teams are able to move at their own pace.
- **Better code ownership.** Unlike the monolithic structure which enables common code to be unowned, the new structure forces us to assign a team to own every app and library. By clearly defining ownership, it reduces red tape and finger pointing and enables teams to make improvements to their own apps.
- **Decrease CI / build times.** Instead of having to build and run CI against the whole codebase, developers are able to just build their piece. We use NX to cache these jobs so they are only run when something changes, saving on developer time and CI costs.

## Implementation

We chose [single-spa](https://single-spa.js.org/) for our micro frontend orchestration framework. This allows us to run multiple JavaScript micro-frontends, providing lifecycle hooks to mount and unmount applications as necessary. This was built into an “orchestrator” shell application, a dockerized web app responsible for initialization and routing traffic to the appropriate micro frontend based on the given route. This is all driven by a browser feature called import maps. The orchestrator knows a mapping of routes to applications, and the import map maps each application to CDN assets needed to run that application. Deployments are simple: we just update that app’s entry in the import map to the url for the latest CDN assets.

In the beginning, we started using this orchestrator with the entirety of our admin portal application as a single micro frontend (named “monolith”). Next, we needed to break out our top and side navigations as separate micro frontends. These apps are always present no matter which route the user is on, and them being separate means we can make changes to the top or side nav without having to redeploy every part of the admin portal.

All this code, the micro frontends, orchestrator app, and shared libraries, live in one monorepo. This allows for highly discoverable code and makes it really easy to get to the latest version of all the pieces of our app without having to track down and sync many separate repositories. We use NX as our monorepo tooling, and we wrote custom GitHub Actions workflows for our CI. The combination allows us to only run CI against the modules that are changing (or depending on a changed module) and take advantage of NX’s caching capabilities.

To migrate a page or group of pages out of the monolith, we start by first prepping the code. For the folder of code that needs to get moved into an app, we first break down all the connections from that folder to the rest of the application. Any code outside that folder that’s importing something from inside that folder gets refactored, along with any code inside the folder that is importing from outside. In some cases, this means making copies of files so that each app can be independent. The costs tend to outweigh the benefits of sharing most constants or API definitions across apps.

In some cases, we do need to share code between apps. For this, we can create shared libraries that can be installed across multiple apps. Just like apps, these libraries are stored in the same monorepo so they’re easily discoverable and usable. Not only do libraries help facilitate sharing code across apps, but they also let us break down big structures into small cohesive units that can then be used as building blocks to build back up complex things. Since a library is its own node module, it must be assigned its own owner and have a README, helping with adoption across teams in the company. Some libraries are more utility based (such as a library providing details about the logged in user), others are whole features which get installed across multiple pages (our in-product trialing feature), and still others are for internal tooling for developers (such as our unit test helper library). Splitting all this up via libraries gives us organization and ownership we were missing before, and has been incredibly helpful.

## Outcomes

Overall, we’re very pleased with our progress in adopting micro frontends. At this point, our micro frontend platform has reached a point of maturity where we can break out micro frontends.

- **We’ve upgraded ubiquitous dependencies in multiple apps!** We’ve proven that this plan solves for the original goal of being able to upgrade ubiquitous libraries one by one, and we’ve been able to get two applications migrated without big bang PRs or code freezes.
- **New apps can be created without inheriting tech debt.** Another win has been that we’ve been able to build new features as micro frontends first. This gives those teams the ability to choose the technologies that best suit their project while still being consistent across the whole app.
- **Import maps are extremely powerful.** Import maps unlocked a wonderful developer experience for us. Using import map overrides, we can develop against our staging environment or debug hard-to-reproduce issues that would never have been able to be recreated in any other environment. Finally, we implemented a fallback mechanism that provides an incredible layer of reliability that’s eliminated a previously common incident type.
- **Better experimentation with new tech and patterns.** Adopting new tech in a legacy application is hard, with a lot of hurdles to get things to work or to come up with a path to getting wide adoption. Micro frontends has given us a platform to experiment in green field apps and libraries, get feedback from our developers, and then promote wide adoption with examples in the repo. It led to the adoption of TypeScript and Pinia, and development of internal libraries which are being used to break down tech debt in our code.
- **Shining light in dark places.** There were some critical pieces of our app for which the original authors had left and the areas had gone largely unmaintained. Through this project we had to own and refactor these areas, increasing our app’s stability and bringing more institutional knowledge and documentation back to our team.

Of course, there are always tradeoffs to any design. After two years of development on this architecture, we’ve also noticed some things we’d love to see improvement on in the future:

- **Required a significant investment in tooling.** We’ve had to write a lot of custom tooling to facilitate this setup. We wrote custom Vite plugins to provide micro frontend functionality that it doesn’t support natively, and had to hack through bugs we uncovered in pnpm and Vite. We had to create a custom deployment dashboard that understands our setup. While there are enough tools to build all this ourselves, there aren’t a lot of off the shelf options we could turn to for this.
- **More complexity overall.** Developing and maintaining this micro frontend platform takes a lot of effort, and it’s definitely not as simple as when this was just one Vue application. For us, the tradeoffs make sense and we’re happy with the wins.
- **Moving code to a micro frontend requires a lot of refactoring.** Since our codebase has been developed without micro frontends in mind, there’s a lot of cross dependencies between the apps that need to be pulled out. We’ve had success pulling out isolated apps and developing new features as apps first, but pulling apart more legacy code requires a lot of refactoring to eliminate blocking tech debt.

The journey into micro frontends has just begun for us. We’re excited to continue learning and improving our setup as we move more and more pages into micro frontends.