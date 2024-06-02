import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const irl = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		startDate: z.coerce.date().optional(),
		finishDate: z.coerce.date(),
		heroImg: z.string().optional(),
		otherImgs: z.array(z.string()).optional(),
	})
})

export const collections = { blog, irl };
