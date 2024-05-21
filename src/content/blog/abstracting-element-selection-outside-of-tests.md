---
title: 'Abstracting Element Selection Outside of Tests'
description: 'Lorem ipsum dolor sit amet'
pubDate: '2024-05-19'
---


When writing unit tests for a component, we’re almost assuredly going to be referencing an element on the screen in our tests. The unit testing framework will give you some ability to track down the element or component you need, and then you can act and assert on it. For example, you might have a test like this: 

```js
// bad: tests without abstracted element selection

describe('FooComponent', () => {
	function render() {
		return mount(FooComponent);
  }

  it('should update the text when the button is clicked', () => {
	  const wrapper = render();
    const button = wrapper.findComponent({ name: 'Button' });
    const display = wrapper.find('#display');
    button.click();
    
    expect(display.text()).toBe('foo');
  });
});
```

Simple enough. For a single test, the testing framework’s element selection methods work great. But when writing tests for a component, I’m going to need to select from the same set of elements many times across the suite. Now I’m copying selection logic across tests:

```js
// bad: more tests without abstracted element selection

it('should hide the button when the button is clicked', () => {
  const wraper = render();
  const button = wrapper.findComponent({ name: 'Button' });
  button.click();
  
  expect(button.exists()).toBe(false);
});

it('should disable the button when the service is broken', () => {
	someService.mockRejectedValue();
  const wraper = render();
  const button = wrapper.findComponent({ name: 'Button' });
  
  expect(button.element.disabled).toBe(true);
});
```

This copy/pasting of selection logic isn’t necessarily *wrong.* The logic for getting the element is already largely abstracted behind the `findComponent` or `find` method from our testing library. 

But when writing a test suite, isn’t it a bit annoying to have to copy/paste this line several times throughout your test suite. Doesn’t it make you a little frustrated with the amount of boilerplate it takes to write another test. Does it make you want to cut corners and skip on tests or throw unrelated criteria into a single test to save the number of duplicate lines you’ll have to add.

What about maintainability? In six months when your co-worker needs to add another button to this component, how difficult will it be to update the tests? Now `wrapper.findComponent({ name: 'Button' })` won’t be the right way to select that element (since there’s multiple button components). He’ll have to go through and change all the instances of this copy/pasted selection logic in tests he shouldn’t have to touch just to write tests to cover this new behavior.

Finally, what about test readability? The more things you need to do inside any given test, the harder it will be for you or your coworkers to understand and maintain the test six months from now. Sure, it’s not *that* complicated: at least we’re assigning this `findComponent()` outcome to a well named variable. But does element selection logic really *belong* to this test, in the same way that the *act* and *assert* steps are very much bound to the test name and function. Not really.

For all these reasons, I think all dev teams should have this as a testing best practice: 

> Abstract element selection logic outside of individual component tests.

This solves several problems:

- Only define the logic for selecting a given element once. Less boilerplate to copy paste
- Selection logic can be changed painlessly. Update one getter and all the tests will follow this new selection logic.
- Great reference for what elements exist in the component. No hunting through individual tests to find the logic for selecting that one button: it’s all in one list
- Reducing complexity in each test, making them faster to read and write.

There are many different ways you could implement this basic principle. This is how I like to do it:

```js
// good: element selection abstracted

describe('FooComponent', () => {
	function render() {
		const wrapper = mount(FooComponent);
		
		// All element selection logic written here...
		const elements = {
		  get button() { return wrapper.findComponent({ name: 'Button' }); },
		  get display() { return wrapper.find('#display'); },
		}
		
		return {
		  elements,
		  wrapper,
		}
  }

  it('should update the text when the button is clicked', () => {
	  const { elements } = render();
    elements.button.click();
    
    expect(elements.textDiv.text()).toBe('foo');
  });
});
```

Using getters here has two benefits:

First, it means that the selection logic is executed on reference instead of whenever I define this constant structure. I’m not at risk of selecting a stale element if something happens in between rendering and selecting the element that changes things. 

Second, it reads better. Doing something like `getButton().click()` adds extra words and parenthesis I can avoid. This technique implements the abstraction I want: I’m just accessing an element in the component. All logic or knowledge of how to get that element is completely abstracted away. 

I’ve been using this technique for a year and a half to great success. When writing a new suite, I start with the elements const and just define all the elements I’m going to need for the suite. Then, I don’t have to think about it ever again while writing each test. The tests start to write themselves in the sort of broken English that good test code resembles. It keeps you in the flow state of test writing, and reduces a point of friction for following other good testing practices.

And it maintains like a dream. Adding more functionality? You can easily reference any element in the component without having to remember how you (or your coworker) did it. You can quickly add/remove elements to the list, and when selection logic needs to change it’s all in one block of code. 

I hope you give this a try the next time you write a test suite. Maybe you’ll even encourage a teammate to do so as well, or add it to your team’s testing best practices. If you do try it out, I’d love to hear how it goes!