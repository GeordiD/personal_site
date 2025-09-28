---
title: 'How I use Claude Code'
description: 'Tips and Tricks for how I get the most out of Claude Code'
pubDate: '2025-09-27'
---

I've been using Claude Code since June 2025, and it's become my go-to agent both at work and at home. It has unlocked new development approaches and fundamentally changed how I tackle problems. Even better, it's significantly lowered the barrier to working on personal projects, making it much easier to grab my laptop on an evening or weekend and quickly implement a feature or fix a bug.

At the same time, the barrier of entry for Claude Code is higher than IDE-integrated tools like Cursor. I initially bounced off it pretty hard and only committed to learning it because it came bundled with Claude in the browser. After sticking with it for a few days and learning some critical workflows and tricks, it really clicked for me.

My goal with this article is to share what I've learned about Claude Code and maybe convince you to give it a try. I'm by no means an expert, so if you got a tip to share shoot me a DM.

## Proper `CLAUDE.md` Management

When you first start Claude Code (CC) in a new project, you'll be prompted to create a `CLAUDE.md` file via the `init` command. The `CLAUDE.md` file works like Cursor's `.cursorrules` or the generic [agents.md](https://agents.md/) concept: a set of instructions for CC to follow while working in this project.

These instructions are considered gospel and will override instructions that are given when prompting. Thus, managing your `CLAUDE.md` is incredibly important, as a file full of bloat, duplicated or unnecessary instructions just fills up the most important part of your agent's context with noise. My tip here is to aggressively trim down your `CLAUDE.md` file. The initial generation from CC's `init` command is mostly AI slop that uses too many words and focuses on the wrong things.

When writing a `CLAUDE.md` file, my guiding principles are:

- Less is more.
  - Distill your instructions into short and clear sentences or bullet points.
  - Only use examples when necessary.
- Only add instructions to the file to solve problems you're experiencing when using CC.
  - Conversely, don't have instructions in your `CLAUDE.md` file you aren't absolutely sure are useful.

By following these principles, you start with a smallish file with very few instructions and add to it bit by bit to solve the problems the agent hits over and over. By doing it this way, you end up with a small file that doesn't flood your context.

One last tip: I always include an instruction for CC to run my lint and typecheck scripts with any change and fix any errors. This ensures that by the time CC finishes, it has already fixed all the type/lint errors it's sure to produce. (You could do this with a hook, but I've had good luck with just an instruction in the `CLAUDE.md` file, especially since TS/lint times can be slower on larger codebases.)

## How do you fly this thing?

Claude Code is very powerful, but there's a lot of interface hidden around the edges. It is a terminal application after all. Here are some essential tips I have for using Claude Code:

- Commit often.
  - I tend to commit with each major generation and commit my edits separately.
- Use planning mode. More on that below.
- To make new lines when prompting, type `\` before pressing `ENTER`.
- When prompting, tag related files using `@<path-to-file>`
- Use `/compact` when needed to keep your context from running out
  - `/compact` will summarize all the context we've built up during this session and replace the session context with this summary.
  - You can monitor this in the bottom right. It will start to warn you when you have ~30% of the context window remaining
  - I tend to try to run `/compact` at a stopping point or when I'm hitting 10-25% of the context window left
  - CC will auto-compact once it runs out of context. I like to compact early so that I don't get my context compacted in the middle of it trying to do something.
  - You can pass instructions to the `/compact` command, but I rarely do.
- When switching tasks, use `/clear` to clear the context.
  - It's always better to start fresh when switching tasks (or if your last session is not going well).
- When first using CC, it will have to ask you to run _a lot_ of commands it needs to do its work. The more you use it and "always allow" commands, the less it will get hung up on permissions checks
  - I tend to "always allow" most things, but I'm not brave enough to use `--dangerously-skip-permissions` mode
- Claude Code has different keywords you can use to trigger different levels of extended thinking.
  - "think" < "think hard" < "think harder" < "ultrathink."
  - This can be pretty useful when planning a big task or when CC has been struggling on an issue and needs to think more critically.
- Claude Code can spin off sub-agents to work in parallel on a task, you just need to ask it to use them (keyword: "sub-agents").

## Planning mode

For any agentic coding tool you use, you have to have good prompt. Good prompts lead to good context which lead to good results. For medium to large sized tasks, it's going to be a pain to write a good enough prompt for CC to accurately and effectively complete the task. This is where planning mode comes in.

If you press shift+tab with CC open, you'll can switch CC into "plan mode". In this mode, it won't write any code but instead research and plan out what it's going to do first. This allows you to be more vague in your initial prompt and then let CC write the actual prompt that the agent will use to execute the task. Even better, it allows you to correct and modify the plan before any code's been written so that the agent can perform exactly the operation you're expecting.

When working in plan mode, I start with a goal of what we're trying to accomplish, followed by bullet points for all the context I want to give the agent. This includes pointing out files it should read (and telling it to read related files), giving insight on how I expect something to be implemented, or defining the scope of what I want to accomplish in this session. You're moving all the information you know about the project into the agent's context so it can work effectively.

Once CC comes back with a plan, you'll need to review and provide feedback. For smaller tasks, it can typically create a good plan in one shot. For bigger projects, I'll give one, two, or even three rounds of feedback to craft the right plan. Most of the time, this involves tweaking things like file structure or database design. Sometimes you realize you've overlooked something entirely and need to provide more context. Other times, looking at a plan makes you realize your original idea doesn't make sense and it's time to go back to the drawing board.

Once you're happy, shift-tab it into auto-accept edits mode and let it get cooking.

## Two (or three) instances at the same time

So you got Claude Code spinning off on a task, crunching through problems and churning out code. But what are you supposed to do? Just sit there and watch it? Booorrringgg!

Almost immediately, I wanted to get multiple instances of Claude Code running at the same time. If I was abstracting myself up a level by giving more instructions and letting CC handle more of the implementation, maybe I could have multiple projects running simultaneously.

To do that, I started using git worktrees. Git worktrees let you check out different branches of the same repository into separate directories. Then I can have a CC agent working in each worktree on different problems without them interfering with each other.

When you search for git worktrees and Claude Code, you'll find plenty of materials. I won't go into a full setup here, but I'll share some tips that worked well for me.

- I have three workspaces set up: the main repo + two git worktrees ("workspace-2" and "workspace-3")
- I use Mac's virtual desktop feature to separate my three workspaces.
  - Each virtual desktop has a IDE + terminal instance + anything else I need for that project
  - I can just swipe between desktops to switch between different workspaces
- All three workspaces point to the same local database and same dev server
  - If you're good with docker you could probably have each one going with a separate dev server + database instance. Alas, I'm not that good with docker.
  - In practice, this is not really a problem. Very rarely do I get blocked from working in a workspace due to multiple workspaces needing to make conflicting database changes.
- It's generally a bad idea to try to work three tickets at once (ask me how I know)
  - I tend to have one project/workspace I'm focusing on.
  - When I have down time in that project (waiting for generation or tests or something), I can have a backup project that I'm working on a plan for or spinning through iterations.
  - Having multiple workspaces is great for being able to pull down and test PRs or quickly fix a bug without needing to wreck your current git setup. Sometimes it's just hard to put down what you're working on, but with multiple git worktrees you don't have to.

## FAQ

- What size task should I give Claude Code?
  - Figuring out the right size of task to give CC is an art. It'll take you trial and error to start to get a feel for what is right for the moment.
  - Counterintuitively, the tasks I understand the most get vibe coded while the tasks I understand the least get coded by hand.
- What subscription should I get?
  - When I was first trying this out, I just used the pay-by-token plan. I used this at work for about a week until I was sure it would be a primary driver for me. I was spending ~$10/day on tokens, so it was easy to convince my boss I should switch to a plan.
  - At work, I use the $100/mo Max plan. It seems to do decently well, though on weeks of heavy usage I run out of Opus credits and am stuck using Sonnet.
  - At home, I use the $20/mo Pro plan. This is totally fine for the limited time I put into personal projects. As an added bonus, having access to `claude.ai` in the browser has been well worth it for home server and gardening projects.
- Should I use Claude Code in the terminal or as a VSCode extension?
  - I only use Claude Code in the terminal. I like using Warp and running Claude Code from there.
  - When using it from the terminal, you can connect it to your IDE using `/ide`
  - I've heard good things about the extensions, I just prefer to use the terminal.
  - Bonus: At work we run the [Claude Code Github action](https://github.com/anthropics/claude-code-action), and it's pretty nice. You can just type `@claude` and spin up an agent to work on something via GHA. I find it's good for some things, but I prefer the quicker feedback loop of the terminal app for most projects.
- What about MCP servers do you use?
  - [Playwright](https://github.com/microsoft/playwright-mcp) - It can use it take screenshots of the frontends it makes and then self-correct mistakes.
  - [Linear](https://linear.app/docs/mcp#claude) - I can pull in the ticket I'm working on to get more context

I'll keep updating this doc with what I learn about Claude Code. If you haven't tried it, I encourage you to give a shot on your next project. If it's not your thing, almost all of these concepts are completely transferable to any other agent. Finally, I'll just say again that I'm by no means an expert. If you have a suggestion of a way I can improve my workflow, [shoot me a DM](https://www.linkedin.com/in/geordid/)!
