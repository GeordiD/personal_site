---
title: Posts
noHeader: true
---
<script setup lang="ts">
import { data as posts } from '/blog/posts.data';
</script>

<div>
    <p class="font-bold text-xl">Posts</p>
    <ul>
        <li v-for="post of posts">
            <strong><a :href="post.url">{{ post.frontmatter.title }}</a></strong><br/>
            <span>{{ post.frontmatter.date }}</span>
        </li>
    </ul>
</div>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0;
    font-size: 1.125rem;
    line-height: 1.75;
}

li {
    display: flex;
    justify-content: space-between;
}
</style>