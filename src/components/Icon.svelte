<script lang="ts">
  import { parse } from 'node-html-parser';

  function getSVG(name: string) {
    const filepath = `/src/icons/${name}.svg`;
    const files = import.meta.globEager<string>('/src/icons/**/*.svg', {
      as: 'raw',
    });

    if (!(filepath in files)) {
      throw new Error(`${filepath} not found`);
    }

    const root = parse(files[filepath]);

    const svg = root.querySelector('svg');
    const { attributes, innerHTML } = svg;

    return {
      attributes,
      innerHTML,
    };
  }

  export let icon;
  let className;
  export { className as class };

  const { attributes, innerHTML } = getSVG(icon);
</script>

<svg {...attributes} class={className}>
  {@html innerHTML}
</svg>
